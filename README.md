Charcoal Multi-Input
====================

jQuery plugin to split a simple text input into a rich multi-input UI.

Charcoal Multiple Input jQuery plugin was developped for <a href="http://charcoal.locomotive.ca">Charcoal</a>, a content management system created by <a href="http://locomotive.ca" title="Locomotive, a Montreal Web agency">Locomotive, a Montreal Web agency</a>.

# FEATURES
* Transform a single text input into a rich user interface
	* Easily add, remove
* Split by a custom separator string
* Keyboard navigation
	* Does not break tab-support
	* Arrow navigation between inputs
	* Support for backspace and line breaks
* 100% javascript
	* Graceful degradation (to a simple text input)
	* Not linked to any backend or server-side scripts
* Support jquery UI drag and drop (optional)
* Customizable
	* Custom separator
	* Styles are all done in CSS
	* See configuration section, below
* Ultra light-weight, at 4.3k minified.

# PLANNED FEATURES (TODO)
* Provide a default CSS file with the plugin
* Support for "content-editable" input that can be styled in CSS (and are compatible on all browsers)
* Support for a &lt;ul&gt; / &lt;li&gt; item structure instead of &lt;div&gt; 
* Support for "submit-as-array" instead of re-joining into a single string
* Support for "inline" item lists. This can probably be done 100% in CSS.

# USAGE
Given the following HTML markup:

``` html
<div>
	<input type="text" name="example" id="example" value="Value 1,Value 2, Value 3" />
</div>
```

Transforming the input into 3 inputs is as simple as:

``` javascript
<script>
	var options = {};
	$('#example').multiple_inputs(options);
</script>
```


# CONFIGURATION OPTIONS
The following options can be set

| Option                         | Type   | Default value  | Description                                               |
| ------------------------------ | ------ | -------------- | --------------------------------------------------------- |
| **separator**                  | string | ,              | What to split/join the string with.                       |
| **min**                        | int    | 0              | Minimum number of items. If 0, then there is ignored (no limit). |
| **max**                        | int    | 0              | Maximum numbers of item. If 0, then no limit.             |
| **form_element**               | string | input          | Can be "input" or "content-editable". Not that 0.1 does not yet support content-editable form_element option. |
| **list_container**             | string | div            | Can be "div" or "ul". Note that v.0.1 does not yet support ul container. |
| **keyboard**                   | bool   | true           | Support keyboard navigation (*true*) or not (*false*).    |
| **auto_split**                 | bool   | true           | If true, then a new input will be created automatically when the separator string is entered in an input. |
| **show_action**                | bool   | true           | Show or not the actions button (delete, reorder, add).    |
| **drag_and_drop**              | bool   | true           | If true, enable reordering by drag and drop (require jQuery UI / Sortable). If false, then display two action buttons (*move up* and *move down*) instead of just one (*reorder*) |
| **btn_delete_html**            | string | ✘              | The HTML markup inside the delete (&lt;a&gt;) button.           |
| **btn_reorder_html**           | string | ↕              | The HTML markup inside the reorder (&lt;a&gt;) button. Note that this button is only displayed if *drag_and_drop* is set to *true*  |
| **btn_reorder_up_html**        | string | ↑              | The HTML markup inside the reorder / move up (&lt;a&gt;) button. Note that this button is only displayed if *drag_and_drop* is set to *false* |
| **btn_reorder_down_html**      | string | ↓              | The HTML markup inside the reorder / move down (&lt;a&gt;) button. Note that this button is only displayed if *drag_and_drop* is set to *false* |
| **btn_add_html**               | string | +              | The HTML markup inside the add (&lt;a&gt;) button.              |
| **btn_css_class**              | string | btn            | The CSS class common to all action buttons.               |
| **btn_delete_css_class:**      | string | del            | The CSS class for the delete button.                      |
| **btn_reorder_css_class**      | string | reorder        | The CSS class for the reorder button.                     |
| **btn_reorder_up_css_class**   | string | up             | The CSS class for the reorder / move up button.           |
| **btn_reorder_down_css_class** | string | down           | The CSS class for the reorder / move down button.         |
| **btn_add_css_class**          | string | add            | The CSS class for the add button.                         |

# EXAMPLES
Documentation with examples on a 0.1 release? Lolz.

# DOWNLOADS
Version 0.1 was released on Dec. 4th, 2013
* [github] https://github.com/mducharme/Charcoal-Multi-Input

# CREDITS
* Mathieu Ducharme &lt;mat@locomotive.ca&gt;
