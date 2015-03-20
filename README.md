#Menu Builder
This Module allows you to easily create custom menus/navigation lists in the ProcessWire Admin Panel using drag and drop. In the backend, it uses the [nestedSortable](https://github.com/mjsarfatti/nestedSortable) jQueryUI plugin by Manuele J Sarfatti.


##Features
* Visual menu builder
* Ability to create menus that do not mirror your ProcessWire Page Tree hierarchy/structure
* Menus can contain both ProcessWire pages and custom links
* Create menu hierarchies and nesting via drag and drop
* Lock down menus for editing
* Easily apply CSS IDs and Classes to each and every menu item if you wish
* Optionally set custom links to open in a new tab
* Readily view the structure and settings for each menu and menu item
* For each menu, multiple configurable ways to add menu items from ProcessWire pages - PageAutocomplete OR AsmSelect[default] AND ProcessWire Selector 
* Using a Selector, you can do for example, template=basic-page, limit=20, sort=title.
* Batch edit menus
* Menus stored as pages (note: just the menu, not the items!)
* Menu items stored as JSON in a field in the menu pages (empty values not stored)
* For page fields, you can specify a selector to return only those specified pages for selection in the page field (i.e. Asm and Autocomplete)
* For page fields, you can also add CSS classes and IDs as you add the items (similar to custom menu items)
* Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
* Advanced features (e.g. add pages via selector, menu settings) permissible to superadmins only
* Delete single or all menu items without deleting the menu itself
* Easily render menus and breadcrumbs in the frontend using MarkupMenuBuilder

##How to Install

The module has two components:

* ProcessMenuBuilder: for creating menus in the ProcessWire Admin
* MarkupMenuBuilder: for displaying menus in the frontend (unstyled, unordered list by default)

1. 	Install the module from within the ProcessWire admin or download the module and copy the file contents to **/site/modules/MenuBuilder/**
2. 	In Admin, click Modules > check for new modules
3. 	Click install ProcessMenuBuilder. The module will automatically install MarkupMenuBuilder
4. 	Go to Setup > Menu Builder and start creating your menus

##Note

* The module installs three fields: **'menu_items', 'menu_pages'** and **'menu_settings'** and one template **'menus'**. If any similarly named fields/template are already present on your site, the module will not install but throw an error instead. You would need to rename your fields/template first. 
* To allow access to the Menu Builder admin, a non-superuser must have the permission **menu-builder**. The persmission is created on install.
* Some Menu Builder admin options are only available to Supersusers by default. Other users would require specific permissions as described below.

##API

MarkupBuilder has two methods available to users.

###render()

This method renders a menu/navigation list of a specified menu. The method accepts two arguments/parameters.

````php
render($menu, $options);

````

The first argument is not optional and can be a Page object, a title, name or id of a menu or an array of menu items returned from a menu's menu_items field.
The second argument is an optional array and will fall back to defaults if no user configurations are passed to the method.

The available **render()** options are:

````php
$defaultOptions = array(

		'wrapper_list_type' => 'ul',//ul, ol, nav, div, etc.
		'list_type' => 'li',//li, a, span, etc.
		'menu_css_id' => '',//a CSS ID for the menu
		'menu_css_class' => '',//a CSS Class for the menu
		'submenu_css_class' => '',//CSS Class for sub-menus
		'has_children_class' => '',//CSS Class for any menu item that has children
		'first_class'=>'',//CSS Class for the first item in 
		'last_class' => '',
		'current_class' => '',

);
````

###renderBreadcrumbs()

This method renders a breadcrumb navigation of a specified menu. The method also accepts two arguments/parameters.

````php
render($menu, $options);

````

Similar to **render()**, the first argument is not optional and can be a Page object, a title, name or id of a menu or an array of menu items returned from a menu's menu_items field. This means that you only have to retrieve a menu once and pass that to both **render()** and **renderBreadcrumbs()**.
The second argument is an optional array and will fall back to defaults if no user configurations are passed to the method. The options are very similar to those of **render()**. Hence, as applicable, you can create one array of options and pass it to both **render()** and **renderCrumbs()**. The methods will pick up what's of relevance to them.

The available **renderBreadcrumbs()** options are:

````php
$defaultOptions = array(

		'wrapper_list_type' => 'ul',//ul, ol, nav, div, etc.
		'list_type' => 'li',//li, a, span, etc.
		'menu_css_id' => '',
		'menu_css_class' => '',
		'current_css_id' => '',
		'divider' => '&raquo;',// e.g. Home >> About Us >> Leadership
		//prepend home page at the as topmost item even if it isn't part of the breadcrumb
		'prepend_home' => 0,//=> 0=no;1=yes

);
````
###Options

1. Unless indicated otherwise, all the following options apply to both **menus (render())** and **breadcrumbs (renderBreadcrumbs())**.
2. The term navigation is used in the context of both menus and breadcrumbs. 
3. The term 'Class(es)' indicates that multiple CSS Classes can be applied, separated by space.


* **wrapper_list_type**:  Outer HTML/Markup wrapper for navigation items. The default is ** &lt;ul&gt;**.  You can also use **&lt;div&gt;**,  **&lt;nav&gt;**,  **&lt;ol&gt;**, etc, to suit your needs.
* **list_type**:  The HTML/Markup wrapper for the navigation items themselves. The default is ** &lt;li&gt;**.  You can also use **&lt;span>, etc or even nothing. For menus, in case you specify you want to use nothing, i.e. **'list_type' => ''**, nagivation items' CSS Class(es) and IDs will be applied to the  **&lt;a>, i.e. the link, rather than the default which would have been the list type.
* **menu_css_id**:  A CSS ID applied to the top-most **'wrapper_list_type'**, i.e. the outermost HTML/Markup wrapper for navigation items. Nothing is applied by default unless you specify you want to use the option.
* **menu_css_class**:  A CSS Class applied to the top-most **'wrapper_list_type'**, i.e. the outermost HTML/Markup wrapper for navigation items. Nothing is applied by default unless you specify you want to use the option.
* **submenu_css_class**:  **For menus only**, a CSS Class(es) applied to any nested **'wrapper_list_type'**, i.e. inner HTML/Markup wrapper for sub-menus. Nothing is applied by default unless you specify you want to use the option.
* **has_children_class**:  **For menus only**, a CSS Class(es) applied to the **'list_type'** of any menu item that has children items, i.e. a parent menu item or in other words, a menu item containing one or more nested menu items. Nothing is applied by default unless you specify you want to use the option.
* **first_class**:  **For menus only** and at all menu levels (i.e. nesting), a CSS Class(es) applied to the **'list_type'** of any menu item that is at the top-most position at each menu level. Nothing is applied by default unless you specify you want to use the option.
* **last_class**:  **For menus only** and at all menu levels (i.e. nesting), a CSS Class(es) applied to the **'list_type'** of any menu item that is at the bottom-most position at each menu level. Nothing is applied by default unless you specify you want to use the option. At any level, if there is only a single menu item, it means that it is both the first and last menu item. If you specified both **'last_class'** and **'first_class'** in your menu options, that menu item will have both of these applied to it.
* **current_class**:  **For menus only**, a CSS Class(es) applied to the **'list_type'** of the current menu item, i.e. the menu item that corresponds to the page that is currently being viewed in your browser. Nothing is applied by default unless you specify you want to use the option.
* **current_css_id**:  **For breadcrumbs only**, a CSS ID applied to the **'list_type'** of the current breadcrumb item, i.e. the breadcrumb item that corresponds to the page that is currently being viewed in your browser. Nothing is applied by default unless you specify you want to use the option. Note that by default, current breadcrumb items are not wrapped around **&lt;a&gt;** (anchor/link) tags as it makes no sense to do so.
* **divider**:  **For breadcrumbs only**, a HTML Character Entity applied after the anchor tag **&lt;a&gt;** of breadcrumb items to indicate ancestry, i.e. items to the left of the divider are ancestral parents, grandparents, great grandparents, etc. to the breadcrumb item on the right of the divider. The default character used is **&raquo;**. Note that if there is only one breadcrumb item in the navigation, the divider is not applied. Also, it is not applied after the last breadcrumb item which is always the current breadcrumb item. You are not limited to using [HTML Character Entities](http://dev.w3.org/html5/html-author/charref) but can use whatever character suits your needs or nothing at all by specifying **'divider' => ''** in your options.
* **prepend_home**:  **For breadcrumbs only**, specifying this option prepends your website's 'Homepage' title and URL as a breadcrumb as the topmost item in the navigation even if it isn't ancestrally part of the breadcrumb. This option is not applied by default. To use it specify **'prepend_home' => 1** in your options array.

##How to Use

* Access Menu Builder in your ProcessWire admin and create a menu(s).
* Edit the menu and add items to it, dragging and dropping them in different positions as you wish.
* Once you've created a menu, you can view it in the frontend by loading it using MarkupMenuBuilder in a template file as follows.

####Rendering a Menu

````php

//load the module
$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example

/**you can render by menu Page object, name, title, id or properly formatted array of menu items**/

//render by name, title or id
echo $menu->render('Title of Your Menu');//render the menu by title
echo $menu->render('name-of-your-menu');//render the menu by name
echo $menu->render('1234');//render by ID

//render by passing a Page object
$m = $pages->get(1234);
echo $menu->render($m);//render by Page object

//render by passing an array
//get the Menu Builder field menu_items for this menu. That is where your menu items JSON string is stored
$json = $pages->get(1234)->menu_items;
//convert the JSON string to an array. Here we assume the JSON string is not empty
$array = json_decode($json, true);
echo $menu->render($array);//render by array

````

You can render additional menus as well, e.g.

````php

echo $menu->render('sidenav');
````

You can additionally pass CSS class/id options to the method. See above for available options.

````php
$options = array(
	'has_children_class' => 'has_children',
	'current_class' => 'current',
	'menu_css_id' => 'main',
	'menu_css_class' => 'nav',
);

echo $menu->render('sidenav', $options);
````
####Rendering Breadcrumbs

Rendering breadcrumbs is quite similar to the above, the only difference being the method you use and some of the options that can be used to configure the output.

````php

//load the module
$menu = $modules->get('MarkupMenuBuilder');//Load the module. $menu is an example

/**you can render by menu Page object, name, title, id or properly formatted array of menu items**/

//render by name, title or id
echo $menu->renderBreadcrumbs('Title of Your Menu');//render the menu by title
echo $menu->renderBreadcrumbs('name-of-your-menu');//render the menu by name
echo $menu->renderBreadcrumbs('1234');//render by ID

//render by passing a Page object
$m = $pages->get(1234);
echo $menu->renderBreadcrumbs($m);//render by Page object

//render by passing an array
//get the Menu Builder field menu_items for this menu. That is where your menu items JSON string is stored
$json = $pages->get(1234)->menu_items;
//convert the JSON string to an array. Here we assume the JSON string is not empty
$array = json_decode($json, true);
echo $menu->renderBreadcrumbs($array);//render by array

````

Additionally, you can pass some options to the method. See above for available options.

````php
$options = array(
		'wrapper_list_type' => 'div',
		'list_type' => 'span',
		//'list_type' => '',//if empty, no tag will be applied + no CSS ID
		'menu_css_id' => 'crumbs',
		'menu_css_class' => 'trail',
		'current_css_id' => 'current',
		'divider' => '&ast;',
		'prepend_home' => 1
);

echo $menu->renderBreadcrumbs(1234, $options);
````

Note that you are not limited to using MarkupMenuBuilder. You can also use your own PHP (or even javascript) recursive function to display your menu by decoding the saved JSON string containing menu items and passing the resulting array to your function for traversal.

The CSS is up to you, of course.

##Permissions

You can use the following permissions to control visibility and access to various advanced settings of Menu Builder by non-superusers. In ProcessWire, by default, Supersusers inherit all permissions. **Note that you will have to create and apply the permissions yourself using the normal ProcessWire way**, i.e.

* Create a role, e.g. **menu-editor**.
* Create **permissions** and add assign them (when editing your role) to the role you created. 
* Create a **user** and assign them the role with the Menu Builder permissions.

There are 7 permissions at your disposal for fine-grained access control of your Menu Builder admin.

1. **menu-builder-lock**
This permission allows your non-superusers to lock and unlock menus using the 'Actions Panel' in Menu Builder's admin main page. **Note two things**:
(i)  This permission takes a whitelist approach. If this permission does not exist on your system (i.e. has not yet been created or is present but unpublished), by default, all users will be able to lock/unlock menus.
(ii)  The permission only kicks in if it is found. In that case, users without the permission will not be able to lock/unlock menus.

2. **menu-builder-delete**
This permission allows your non-superusers to trash and delete menus using either the 'Actions Panel' in Menu Builder's admin main page or, when editing a single menu, via the 'Delete' tab. **Note two things**:
(i)  This permission takes a whitelist approach. If this permission does not exist on your system (i.e. has not yet been created or is present but unpublished), by default, all users will be able to trash and delete menus.
(ii)  The permission only kicks in if it is found. In that case, users without the permission will not be able to trash or delete menus.

3. **menu-builder-selector**
This permission allows your non-superusers to add ProcessWire pages as menu items using a ProcessWire selector. This permission (**and all the rest below**) takes a blacklist approach. The permission does not need to exist in your system to kick in and by default all non-superusers are not able to add pages as menu items using selectors. This means that if you intend that only superusers will be allowed to use selectors in this manner, *there is no need to create the permission*. Only create and apply it if you wish to grant a particular non-superuser this feature. **The same applies to all the following permissions**.

4. **menu-builder-selectable**
This permission allows non-superusers to specify ProcessWire pages that are selectable as menu items in either of the two configurable page fields in Menu Builder, i.e. AsmSelect and PageAutocomplete.

5. **menu-builder-markup**
This permission allows your non-superusers to allow/disallow the use of markup/HTML in menu item titles/labels.

6. **menu-builder-settings**
This permission allows non-supersusers to edit nestedSortable settings, for instance set maxLevels (that controls number of nesting levels in a menu).

7. **menu-builder-page-field**
This permission allows non-superusers to change the page field type used to select ProcessWire pages to add as menu items, i.e. toggle between AsmSelect [default] and PageAutocomplete.

##Uninstall

Uninstall like any other ProcessWire module. Note that **All your menus will be deleted on uninstall!**. The associated fields and template above will also be deleted.

##Resources
* [Support Forum](http://processwire.com/talk/topic/4451-module-menu-builder/)

##License
GPL2

##Changelog

#Version 0.0.6
1. 	Added method in MarkupBuilder for rendering breadcrumbs - renderBreadcrumbs().
2.  Can now also pass Page object to method render() to render menu items/breadcrumbs

#Version 0.0.5
1. 	Corrected some markup errors.

#Version 0.0.4
1. 	Added various permissions to control visibility and editing of advanced settings

#Version 0.0.3
1. 	Option to allow markup in menu item title (label) - superusers only
2. 	Added more options to render() method, e.g. first, last classes

#Version 0.0.2
1.	First Beta version
2.	Menus saved as ProcessWire pages
3.	Menu items saved as JSON in a field in Menu pages
4.	Add menu items from ProcessWire pages using page fields (option to choose between PageAutocomplete and AsmSelect [default]) or a Selector (e.g. template=basic-page, limit-20).
5.	Specify a selector to return only those specified pages for selection in the page field (i.e. asm and autocomplete)
6.	For page fields, similar to custom menu items, add CSS classes and IDs as you add the items
7.	Menu settings for nestedSortable - e.g. maxLevels (limit nesting levels)
8.	Lock down menus for editing
9.	Highly configurable MarkupMenuBuilder


#Version 0.0.1
Initial alpha release