<?php // routes/breadcrumbs.php


// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;


// Home
Breadcrumbs::for('home', function (BreadcrumbTrail $trail) {
	$trail->push('Home', route('home'));
});

// Menu
Breadcrumbs::for('menu', function (BreadcrumbTrail $trail) {
	$trail->parent('home');
	$trail->push('Menu', route('menu.index'));
});

// Menu > Category
Breadcrumbs::for('category', function (BreadcrumbTrail $trail, $category) {
	$trail->parent('menu');
	$trail->push($category->name, route('category.show', $category->slug));
});

// Menu > Category > [Product]
Breadcrumbs::for('product', function (BreadcrumbTrail $trail, $category, $product) {
	$trail->parent('category', $category);
	$trail->push($product->name, route('products.show', ['categorySlug' => $category->slug, 'productSlug' => $product->slug]));
});

// Orders
Breadcrumbs::for('orders', function (BreadcrumbTrail $trail) {
	$trail->push('Comenzi', route('orders.index'));
});

// Order
Breadcrumbs::for('order', function (BreadcrumbTrail $trail, $order) {
	$trail->parent('orders');
	$trail->push('Comanda #' . $order->id, route('orders.show', ['id' => $order->id]));
});


// Rezervations
Breadcrumbs::for('reservations', function (BreadcrumbTrail $trail) {
	$trail->push('Rezervari', route('reservations.index'));
});

// Rezervation
Breadcrumbs::for('reservation', function (BreadcrumbTrail $trail, $reservation) {
	$trail->parent('reservations');
	$trail->push('Resevare #' . $reservation->id, route('reservations.show', ['reservation' => $reservation->id]));
});


// Contact
Breadcrumbs::for('contact', function (BreadcrumbTrail $trail) {
	$trail->parent('home');
	$trail->push('Contact', route('contanct'));
});
