var VertexListContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="vertexListContainer">
        <VertexList data={this.state.data} />
      </div>
    );
  }
});

var VertexList = React.createClass({
  render: function() {
    var vertexNodes = this.props.data.map(function (vertex) {
      return (
        <Vertex key={vertex.pageRank} url={vertex.url}>
            {vertex.pageRank}
        </Vertex>
      );
    });
    return (
      <div className="vertexList">
        {vertexNodes}
      </div>
    );
  }
});

var Vertex = React.createClass({
  componentDidMount: function() {
    var $vertexList = $('.vertexList');
    $vertexList.find('.vertex').sort(function (a, b) {
      console.log();
      var aVal = $($(a).find('.vertexPageRank')[0]).text();
      var bVal = $($(b).find('.vertexPageRank')[0]).text();
      return -aVal - -bVal;
    }).appendTo( $vertexList );    
  },
  render: function() {
    return (
      <div className="vertex">
        <h2 className="vertexUrl">
          {this.props.url}
        </h2>
        <span className="vertexPageRank">
          {this.props.children}
        </span>
      </div>
    );
  }
});

React.render(
  <VertexListContainer url="js/vertices.json" />,
  document.getElementById('content')
);
