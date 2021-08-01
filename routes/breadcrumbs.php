<?php // routes/breadcrumbs.php


// This import is also not required, and you could replace `BreadcrumbTrail $trail`
//  with `$trail`. This is nice for IDE type checking and completion.
use Diglactic\Breadcrumbs\Breadcrumbs;
use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

// Menu
Breadcrumbs::for('menu', function (BreadcrumbTrail $trail) {
	$trail->push('Menu', route('home'));
});

// Menu > Category
Breadcrumbs::for('category', function ($trail, $category) {
	$trail->parent('menu');
	$trail->push($category->name, route('category', $category->slug));
});

// Menu > Category > [Product]
Breadcrumbs::for('product', function ($trail, $category, $subCategory, $product) {
	$trail->parent('category');

	$trail->push($subCategory->name);
	$trail->push($product->name, route('product', $product->slug));
});
