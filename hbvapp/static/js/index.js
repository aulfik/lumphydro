/*
  plot.js contains functions to generate plots using library plotly.js. Plots
  generated by Bokeh python is not as interactive as expected. For example, it
  is hard to call a callback function when we want to use values on the graph.
  And another idea is that plotly.js is capable to append/add traces(glyphs)
  dynamically by updating data, which is more efficient and less complicated than
  using Bokeh to generate <div>s and <script>s sent by post.
*/

/*
  Prototype Schema contains the schema of the HBV tanks and the corresponding
  water levels in the thank. Basically we use D3.js here to realize both the static
  drawing and the transition. D3 will generate water tanks which are mainly static,
  and water levels controled by a scroll bar indicating time. To
  previlige D3's data-driven nature, we will use the DataFrame generated by pyhton
  as our input data here.
*/

function HBV () {
  var hbv = new Object();
  // c stands for Context object
  hbv.c = new Context();
  // d stands for Data object
  hbv.d = new Data();
  // p stands for Plot object
  hbv.p = new Plot();
  // s stands for Schema object
  hbv.s = new Schema();
  // info stands for Information object
  hbv.info = new Object();
  return hbv;
}
