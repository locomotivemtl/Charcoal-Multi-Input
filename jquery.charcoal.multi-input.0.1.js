/**
* Charcoal Multiple Input jQuery plugin
*
* Transform a simple text input into multiple inputs
*
* @copyright (c) Locomotive 2012-2013
* @author Mathieu Ducharme <mat@locomotive.ca>
* @version 2013-12-02
* @since Version 2013-09-01
* @license LGPL
*/
;(function($) {
	$.fn.multiple_inputs = function(options) {

		var that = this;

		this.orig_input = '';

		// Merge parameter with default options
		this.config = $.extend({

			/**
			* What to split/join the string with.
			* @var {string}
			*/
			separator: 			',',

			/**
			* Minimum number of items. If 0, then it is ignored (no minimum)
			* @var {integer}
			*/
			min: 				0,
			/**
			* Maximum numbers of item. If 0, then no limit.
			* @var {integer}
			*/
			max: 				0,
			
			/**
			* Can be either "input" or "content-editable"
			* @var {string}
			*/
			form_element: 		'input',

			/**
			* Can be either "div" or "ul"
			* @var {string}
			*/
			list_container: 	'div',

			/**
			* Support keyboard navigation or not
			* @var {boolean}
			*/
			keyboard: 			true,

			/**
			* If set to true, a new input will be auto-created when the "separator" key is pressed
			* Note that this probably fail if the separator is more than a single char
			* @var {boolean}
			*/
			auto_split: 		true,

			/**
			* Show or not the actions button (delete, reorder, add).
			* @var boolean
			*/
			show_actions: 		true,
			
			/**
			* If drag and drop is enabled, a single reorder button will be shown
			* If set to false, then 2 buttons to move up and down will be displayed instead
			* @var boolean
			*/
			drag_and_drop: true,

			/**
			* The HTML markup that will be displayed in the delete (<a>) button
			* @var string
			*/
			btn_delete_html: 	'✘',

			/**
			* The HTML markup that will be displayed in the reorder (<a>) button
			* Note that this button is only displayed if drag_and_drop is set to true
			* @var string
			*/
			btn_reorder_html: 		'↕',
			/**
			* The HTML markup that will be displayed in the reorder / move up (<a>) button
			* Note that this button is only displayed if drag_and_drop is set to false
			* @var string
			*/
			btn_reorder_up_html: 	'↑',
			/**
			* The HTML markup that will be displayed in the reorder / move down (<a>) button
			* Note that this button is only displayed if drag_and_drop is set to false
			* @var string
			*/
			btn_reorder_down_html: 	'↓',



			/**
			* The HTML markup that will be displayed in the add (<a>) button
			* @var string
			*/
			btn_add_html: 		'+',

			btn_css_class:'btn',
			btn_delete_css_class:'del',
			btn_reorder_css_class:'reorder',
			btn_reorder_up_css_class:'up',
			btn_reoder_down_css_class:'down',
			btn_add_css_class:'add'

		}, options);

		/**
		* Initialize the multiple plugin
		* Replace the original input by multiple 
		*
		* @return jQuery (chainable)
		*/
		this.init = function()
		{
			// Hide the original input
			this.orig_input = this.first();
			this.orig_input.attr('type', 'hidden');
			//this.orig_input.hide();

			// Get the value of the original input
			var val = this.orig_input.val();
			var vals = val.split(this.config.separator);

			// Create the items (one per item of the original input)
			for(i in vals) {
				this.create_item(vals[i]);
			}

			// Create more items if necessay
			if(this.config.min > 0) {
				if(this.config.min < this.num_items()) {
					// Create empty items
				}
			}

			// Make sure the values is re-generated upon save
			var form = this.orig_input.parents('form');
			form.on('submit', function(e) {
				that.val();
			});

			return this;
		};

		/**
		* @param {jQuery} input
		*/
		this.input_container = function(input)
		{
			return $(input).parent();
		}

		/**
		* @param {jQuery} input
		*/
		this.prev_input = function(input)
		{
			return $(input).parent().prev().find('input');
		}

		/**
		* @param {jQuery} input
		* @return {jQuery}
		*/
		this.next_input = function(input)
		{
			return $(input).parent().next().find('input');
		}

		/**
		* @return {integer}
		*/
		this.num_items = function()
		{
			return that.orig_input.parent().find('input[type=text]').length;
		}

		/**
		* @param {mixed} item The input
		*
		* @return jQuery (Chainable)
		*/
		this.delete_item = function(item)
		{
			// Focus previous element
			this.prev_input(item).focus()

			// Delete input container
			this.input_container(item).remove();
			return this;
		};

		/**
		* @param {string} The value to put in the input
		* @param jQuery If set, the previous input (so we can know where to add the new item...)
		*/
		this.create_item = function(val, prev_input)
		{	
			if(this.config.max > 0 && this.num_items() >= this.config.max) {
				return;
			}
			
			// Create the item and add it to the DOM
			var item = $('<div>') 
				//.css('border', '1px solid red')
				//.css('width', '100%')
				.css('clear', 'both');

			var input = $('<input />')
				.css('width', '80%')
				.css('float', 'left')
				.attr('type', 'text')
				.val(val);
			
			item.append(input);

			// Add the item to the DOM, either after an input
			if(typeof prev_input === 'undefined'){
				this.orig_input.parent().append(item);
			}
			else {
				item.insertAfter(this.input_container(prev_input));
			}
			input.focus();

			// Bind the keyboard events
			input.on('keydown', function(e) {
				if(e.keyCode == 13) {
					e.preventDefault();
					// Enter key
					that.create_item('', this);
				}
				if(e.keyCode == 8 || e.keyCode == 46) {
					// Delete keys (8 is backspage, 46 is "del")
					if($(this).val() == '') {
						e.preventDefault();
						that.delete_item(this);
					}
				}
				if(e.keyCode == 38) {
					// Up arrow key (Navigate to previous item if it exists)

					that.prev_input(this).focus();
				}
				if(e.keyCode == 40) {
					// Down arrow key
					that.next_input(this).focus();
				}
			});

			input.on('keyup', function(e) {
				if(that.config.auto_split) {
					var sep = that.config.separator;
					var val = $(this).val();
					var last_chars = val.substring(val.length-sep.length);

					if(last_chars == sep) {
						// Remove the last_chars from the string
						$(this).val(val.substring(0, val.length-sep.length));
						// Create a new item
						that.create_item('', this);
					}
				}
			});

			if(that.config.show_actions) {
				// Create a delete button and bind the delete event
				var btn_del = $('<a>')
					.addClass(that.config.btn_css_class)
					.addClass(that.config.btn_delete_css_class)
					.css('margin', '5px')
					.html(that.config.btn_delete_html);
				btn_del.on('click', function(e) {
					that.delete_item(input);
				});
				
				if(that.config.drag_and_drop) {
					// Create a reorder button and bind the reorder event
					var btn_reorder = $('<a>')
						.addClass(that.config.btn_css_class)
						.addClass(that.config.btn_reorder_css_class)
						.css('margin', '5px')
						.html(that.config.btn_reorder_html);
					// Reinit sortable() functionality
					$('.sortable').sortable({
						handle:'.'+that.config.btn_reorder_css_class,
						axis:'y',
						forcePlaceholderSize:true
					});
				}
				else {
					var btn_reorder_up = $('<a>')
						.addClass(that.config.btn_css_class)
						.addClass(that.config.btn_reorder_up_css_class)
						.css('margin', '5px')
						.html(that.config.btn_reorder_up_html);
					btn_reorder_up.on('click', function(e) {
						var d = that.input_container(that.prev_input(input));
						input.parent().insertBefore(d);
					});
					var btn_reorder_down = $('<a>')
						.addClass(that.config.btn_css_class)
						.addClass(that.config.btn_reorder_down_css_class)
						.css('margin', '5px')
						.html(that.config.btn_reorder_down_html);
					btn_reorder_down.on('click', function(e) {
						var d = that.input_container(that.next_input(input));
						input.parent().insertAfter(d);
					});

				}

				var btn_add = $('<a>')
					.addClass(that.config.btn_css_class)
					.addClass(that.config.btn_add_css_class)
					.css('margin', '5px')
					.html(that.config.btn_add_html);
				btn_add.on('click', function(e) {
					that.create_item('', input);//, $(this).parent().find('input'));
				});

				//  And all buttons in a container
				var action_container = $('<div>')
					.css('display', 'none')
					//.addClass('action-container');

				action_container.append(btn_del);
				if(that.config.drag_and_drop) {
					action_container.append(btn_reorder)
				}
				else {
					action_container.append(btn_reorder_up);
					action_container.append(btn_reorder_down);
				}
				action_container.append(btn_add)
				action_container.insertAfter(input);

				// Show the buttons only when active
				item.on('mouseenter', function(e) {
					action_container.show();
				});
				item.on('mouseleave', function(e) {
					action_container.hide();
				});
			}

		};

		/**
		* Recalculate the value 
		*
		* @return {string} The joined string
		*/
		this.val = function()
		{
			var vals = [];
			that.orig_input.parent().find('input[type=text]').each(function(el) {
				vals.push($(this).val());
			});
			var v = vals.join(that.config.separator);
			this.orig_input.val(v);

			return v;
		};

		// Chainable
		return this.init();
	};
}(jQuery));