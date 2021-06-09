<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Resources\TableCollection;
use App\Interfaces\TableServiceInterface;

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    public function disable(Request $request, int $tableId)
    {
        $table = Table::findOrFail($tableId);

        $table->delete();

        $this->tableService->setStatus($tableId, 4);

        $table->refresh();

        return response()->json(['status' => $table->status], 200);
    }

    public function restore(Request $request, int $tableId)
    {
        $table = Table::withTrashed()->findOrFail($tableId);

        $table->restore();

        $this->tableService->setStatus($tableId, 1);

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
        
        foreach($table->orders as $order) {
            $order->table_id = null;
            $order->save();
        }

        $table->forceDelete();

        return response()->json(null, 200);
    
    }
}
