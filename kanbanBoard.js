class KanbanNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			kanban_note_text: "This is just some sample text for this note"
		}
	}
  render() {
    return (
			<div className="card">
				<div className="card-body">
					<div className="containter-fluid">
						<div className="row" id="note-top-bar">
							<div className="col-4">
								<h4 className="card-title"></h4>
							</div>
							<div className="col-8">
								<ul className="nav justify-content-end">
										<li className="nav-item">
											<a className="btn btn-outline-secondary" href="#">'</a>
										</li>
										<li className="nav-item">
											<a className="btn btn-outline-secondary" href="#">'</a>
										</li>
										<li className="nav-item">
											<a className="btn btn-outline-secondary" href="#">'</a>
										</li>
								</ul>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<p>{this.state.kanban_note_text}</p>
							</div>
						</div>
						<div className="row">
							<div className="col">
								<div className="nav justify-content-end">
									<a href="#" className="btn btn-outline-info">E</a>
									<a href="#" className="btn btn-outline-danger">D</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

class KanbanColumn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes_in_column: []
		}
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(){
		let new_note = <KanbanNote key={this.state.notes_in_column.length + 1}></KanbanNote>

		this.setState({
			notes_in_column: [...this.state.notes_in_column, new_note]
		});
	}

	render() {
  	return (
    	<div className="col-md-4">
			<h5 className="text-center">Column Title</h5>
				{this.state.notes_in_column}
					<div className="row">
						<div className="col" id="kanban-column-options">
							<a href="#" className="btn btn-outline-primary" onClick={this.handleClick}>New Note</a>
						</div>
					</div>
      </div>
    );
  }
}

class KanbanBoard extends React.Component {
	render() {
  	return (
    	<div className="container">
				<div className="row">
					<KanbanColumn></KanbanColumn>
					<KanbanColumn></KanbanColumn>
					<KanbanColumn></KanbanColumn>
				</div>
      </div>
    );
  }
}

ReactDOM.render(<KanbanBoard/>, document.querySelector("#app"))
