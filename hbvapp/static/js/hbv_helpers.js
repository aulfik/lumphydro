/*
This JavaScript file contains functions
to help web iteracting on client-side.

Including:
	- Input dictionaries parsing;
	- Show calibrating results params;
	- **_step_run client side;
	...
*/


function generate_config_dict(){
	/*
		Generating a json or json-like object
		to serve as configuration input in AJAX
	*/

  var header = document.getElementById("id_csvHeaderInput");
  var separator = document.getElementById("id_csvSeparatorInput");
  var warm_up = document.getElementById("id_warmUpInput");
  var obj_fun = $("input[name='objFunctionInput']:checked");
  var tol = document.getElementById("id_tolInput");
  var minimise = document.getElementById("id_minimise");
  var verbose = document.getElementById("id_verbose");

  /*
    validators
  */

  // A Json object for AJAX POST or POST
  var config = {};

  config['header'] = parseInt(header.value);
  config['separator'] = separator.value;
  config['warm_up'] = parseInt(warm_up.value);
  config['obj_fun'] = obj_fun.val();
  config['tol'] = parseFloat(tol.value);
  (minimise.value == "true") ? config['minimise'] = "True" : config['minimise'] = "False";
  (verbose.value == "true") ? config['verbose'] = "True" : config['verbose'] = "False";
  (config['obj_fun'] == "self._rmse") ? config['fun_name'] = "RMSE" : config['fun_name'] = "NSE";

  return config;
}

function show_calibrated_par(par) {
  /*
    Show calibrated parameters on the parameter input panel
  */

  var par_obj = new Object();
  var par_elems = $("#id_div_pars input");

  // Create an object {ElementID: Element}
  for (var i = par_elems.length - 1; i >= 0; i--) {
    par_obj[par_elems[i].id] = par_elems[i];
  }

  for (var this_par in par) {
    if (this_par!='area'&&this_par!='tfac') {
      par_obj['id_'+this_par].value = par[this_par];
    } else {}
  }
}

function deploy_plots(plots) {
  /*
    Deploy all generated Bokeh plots into html and JS
  */

  $("#id_pane_plot_q").html(plots.div.q);
  $(".jslocator_q").next().replaceWith(plots.script.q);

  $("#id_pane_plot_p").html(plots.div.p);
  $(".jslocator_p").next().replaceWith(plots.script.p);

  $("#id_pane_plot_t").html(plots.div.t);
  $(".jslocator_t").next().replaceWith(plots.script.t);

  $("#id_pane_plot_etp").html(plots.div.etp);
  $(".jslocator_etp").next().replaceWith(plots.script.etp);
}
