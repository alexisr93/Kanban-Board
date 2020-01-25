class KanbanNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			kanban_note_text: "This is just some sample text for this note",
			kanban_note_id: this.props.id
		}
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleEdit() {

	}

	handleDelete() {
		this.props.onDelete(this.state.kanban_note_id);
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
									<a href="#" className="btn btn-outline-info" >E</a>
									<a href="#" className="btn btn-outline-danger" onClick={this.handleDelete}>D</a>
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
			notes_in_column: [],
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	handleClick() {
		let new_note_key = Date.now() + this.state.notes_in_column.length + 1;
		// You probably shouldn't build the element here.
		let new_note_object = { element: <KanbanNote key={new_note_key} id={new_note_key} onDelete={this.handleDelete}></KanbanNote>,
														key: new_note_key
													}
		this.setState({
			notes_in_column: [...this.state.notes_in_column, new_note_object]
		});
	}

	handleDelete(id) {
		console.log(id);
		this.setState({
			notes_in_column: this.state.notes_in_column.filter(note => note.key != id)
		});
	}

	render() {
		let notes = this.state.notes_in_column.map(note => note.element);
  	return (
    	<div className="col-md-4">
				<h5 className="text-center">{this.props.title}</h5>
				{notes}
				<div className="row" id="kanban-column-options">
					<div className="col text-center">
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
					<KanbanColumn key="left" title="Todo"></KanbanColumn>
					<KanbanColumn key="center" title="Pending"></KanbanColumn>
					<KanbanColumn key="right" title="Done"></KanbanColumn>
				</div>
      </div>
    );
  }
}

ReactDOM.render(<KanbanBoard/>, document.querySelector("#app"))
