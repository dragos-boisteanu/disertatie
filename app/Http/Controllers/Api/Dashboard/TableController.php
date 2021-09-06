<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Events\UpdateTableStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\TableStoreRequest;
use App\Http\Resources\TableCollection;
use App\Interfaces\TableServiceInterface;
use App\Http\Resources\Table as TableResource;


class TableController extends Controller
{

	private $tableService;

	public function __construct(TableServiceInterface $tableService)
	{
		$this->tableService = $tableService;
	}
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$tables = Table::withTrashed()->with('status')->get();
		return new TableCollection($tables);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(TableStoreRequest $request)
	{
		try {
			$table = new Table();

			$table->name = $request->name;
			$table->seats = $request->seats;
			$table->status_id = 1;

			$table->save();

			return response()->json(['table' => new TableResource($table), 'message' => 'Table created'], 201);
		} catch (\Exception $e) {
			debug($e);
			return response()->json(['message' => 'Something went wrong, try again later'], 500);
		}
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, $id)
	{
		$table = Table::withTrashed()->findOrFail($id);

		$table->name = $request->name;

		$table->save();

		return response()->json(null, 204);
	}

	public function disable(Request $request, int $tableId)
	{
		$table = Table::findOrFail($tableId);

		$table->delete();

		$this->tableService->setStatus($tableId, 4);
		$tableStatus = $this->tableService->getStatusById(4);
		broadcast(new UpdateTableStatus($tableStatus, $tableId));

		$table->refresh();

		return response()->json(['status' => $table->status], 200);
	}

	public function restore(Request $request, int $tableId)
	{
		$table = Table::withTrashed()->findOrFail($tableId);

		$table->restore();

		$this->tableService->setStatus($tableId, 1);
		$tableStatus = $this->tableService->getStatusById(1);
		broadcast(new UpdateTableStatus($tableStatus, $tableId));

		$table->refresh();

		return response()->json(['status' => $table->status], 200);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function destroy($id)
	{
		$table = Table::withTrashed()->with('orders')->findOrFail($id);

		foreach ($table->orders as $order) {
			$order->table_id = null;
			$order->save();
		}

		$table->forceDelete();

		return response()->json(null, 204);
	}
}
