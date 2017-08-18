/*
  This JavaScript file contains the schema of the HBV tanks and the corresponding
  water levels in the thank. Basically we use D3.js here to realize both the static
  drawing and the transition. D3 will generate water tanks which are mainly static,
  and water levels controled by a scroll bar indicating time(date in our case). To
  previlige D3's data-driven nature, we will use the DataFrame generated by pyhton
  as our input data here.
*/

/* This is a oo version of schema to facilate animation manipulation */


function create_schema(){

  var schema = {
    svg: d3.select(".schemaSvg"),
    p_width: [0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1, 1.125, 1.25],
    tanks: {},
    data: {},
    value: 2.0/3.0;
    base: 2.0/15.0;


    generate_key_cords: function(){
      var x = parseInt(this.svg.select("#main_soil").attr("x"));
      var y = parseInt(this.svg.select("#main_soil").attr("y"));
      var w_soil = parseInt(this.svg.select("#main_soil").attr("width"));
      var h_soil = parseInt(this.svg.select("#main_soil").attr("height"));

      var soil = {
        x: x,
        y: y,
        width: w_soil,
        height: h_soil,
        stroke: 4,
        };

      var uz = {
        x: 2,
        y: 438,
        x1: 242,
        y1: 546,
        stroke: 4,
        get width() {
          return (this.x1-this.x);
        },
        get height() {
          return (this.y1-this.y);
        },
      };

      var lz = {
        x: 2,
        y: 621,
        x1: 242,
        y1: 729,
        stroke: 4,
        get width() {
          return (this.x1-this.x);
        },
        get height() {
          return (this.y1-this.y);
        },
      };

      var cords = {soil: soil, uz: uz, lz: lz};
      return cords;
    },

    generate_main: function(name, cords) {
      var cord = eval('cords.'+name);
      var tank = this.svg.append("rect")
                        .attr("x", function(){
                          return (cord.x+0.6*cord.stroke);
                         })
                        .attr("y", function(){
                          return (cord.height*(1-this.value)+cord.y);
                         })
                        .attr("width", function(){
                          return cord.width-0.9*cord.stroke;
                         })
                        .attr("height", function(){
                          return parseInt(cord.height*this.value);
                         })
                        .attr("fill", "#3333cc")
                        .attr("fill-opacity", 0.4)
                        .attr("id", name);
      return tank;
    },

    generate_shade: function (tank) {
      var name = tank.attr("id");
      var stroke = 4;

      var surf = this.svg.append("path")
                          .attr("stroke", "#0f0f3e")
                          .attr("stroke-width", 3)
                          .attr("stroke-opacity", 0.7)
                          .attr("d", function(){
                            var x = tank.attr("x").toFloat();
                            var y = tank.attr("y").toFloat();
                            var length = tank.attr("width").toFloat() + 1.5*stroke;
                            return `M ${x} ${y} H ${length}`;
                          });

      var shade_clip = this.svg.append("clipPath")
                                .attr("id", `${name}_shade_container`)
                                .append("rect")
                                .attr("x", function(){return tank.attr('x').toFloat()+1;})
                                .attr("y", function(){return tank.attr('y').toFloat();})
                                .attr("width", function(){
                                  var w = tank.attr('width').toFloat() - 2;
                                  return w;
                                })
                                .attr("height", function(){
                                  var h = tank.attr('height').toFloat() - 1;
                                  return h;
                                })
                                .attr("fill", "#ccffff");

      var shade = this.svg.selectAll("#shade")
                          .data(this.p_width)
                          .enter()
                          .append("path")
                          .attr("d", function(d){
                            var x0 = tank.attr('x').toFloat() + tank.attr('width').toFloat() * d;
                            var y0 = tank.attr('y').toFloat();
                            var x1 = x0-tank.attr('height').toFloat();
                            var y1 = tank.attr('y').toFloat()+tank.attr('height').toFloat();
                            return `M ${x0} ${y0} L ${x1} ${y1}`;
                          })
                          .attr("stroke", "#3366ff")
                          .attr("stroke-width", 2)
                          .attr("stroke-opacity", 0.5)
                          .attr("clip-path", `url(#${name}_shade_container)`);

      return {surf: surf, shade_clip: shade_clip, shade: shade, name: name};
    },

    init_animation: function() {

      var cords = this.generate_key_cords();
      var tanks = new Object();

      tanks.soil = new Object();
      tanks.soil.main = this.generate_main('soil', cords, this.value);
      tanks.soil.shade = this.generate_shade(tanks.soil.main);
      tanks.uz = new Object();
      tanks.uz.main = this.generate_main('uz', cords, this.value);
      tanks.uz.shade = this.generate_shade(tanks.uz.main);
      tanks.lz = new Object();
      tanks.lz.main = this.generate_main('lz', cords, this.value);
      tanks.lz.shade = this.generate_shade(tanks.lz.main);

      return tanks;
    },

    trans_main: function() {

    },

    trans_shade: function() {

    },

    point_to: function(index) {
      var foo = this.data[index];
      var date = foo.date,
          sm = foo.sm,
          uz = foo.uz,
          lz = foo.lz,
          wc = foo.wc,
          sp = foo.sp;


    }

  };
  return schema;
}

d3.select("#id_date_slider")
  .on("input", function(){
    var index = parseInt(this.this.value);
    schema.point_to(index);
  });



function init_slider(){
  var length = schema.data.length;
  var terminus = length-1;
  if (isEmpty(schema.data)) {
    $("#id_date_slider").prop("disabled", true);
    alert("It seems that we have no data ! ");
  }
  else {
    if ($("#id_date_slider").prop("disabled")) {
      $("#id_date_slider").prop("disabled", false);
      $("#id_date_slider").prop("max", terminus);
    } else {
      $("#id_date_slider").prop("this.value", 0);
      $("#id_date_slider").prop("max", terminus);
    }
  }
}
