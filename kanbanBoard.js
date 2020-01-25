class KanbanNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			kanban_note_text: "This is just some sample text for this note",
			kanban_note_id: this.props.id
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange() {
		this.setState({
			kanban_note_text: event.target.value
		});
	}

	handleDelete() {
		this.props.onDelete(this.state.kanban_note_id);
	}
  render() {
    return (
			<div className="card text-black bg-white mb-3">
				<div className="card-header">
					<div className="row">
						<div className="col-5">
							<div className="nav justify-content-start">
								<a
									href="#"
									className="btn btn-outline-primary"
									data-toggle="modal"
									data-target={"#" + "editNoteModal" + this.state.kanban_note_id} >
								</a>
								<a
									href="#"
									className="btn btn-outline-danger"
									onClick={this.handleDelete}>
								</a>
							</div>
						</div>
						<div className="col-7">
							<div className="nav justify-content-end">
								<a className="btn btn-outline-secondary" href="#"></a>
								<a className="btn btn-outline-secondary" href="#"></a>
								<a className="btn btn-outline-secondary" href="#"></a>
							</div>
						</div>
					</div>
				</div>
				<div className="card-body">
					<div className="containter-fluid">
						<div className="row">
							<div className="col">
							{this.state.kanban_note_text}
							</div>
						</div>
					</div>
				</div>

				<div
					className="modal fade" id={"editNoteModal" + this.state.kanban_note_id}
					tabIndex="-1"
					role="dialog"
					aria-labelledby={"editNoteModalLabel" + this.state.kanban_note_id}
					aria-hidden="true">
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <h5
									className="modal-title"
									id={"editNoteModalLabel" + this.state.kanban_note_id}>
									Edit Note
								</h5>
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
							<form>
					      <div className="modal-body">
					      	<textarea className="form-control" value={this.state.kanban_note_text} onChange={this.handleChange}></textarea>
					      </div>
							</form>
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
		let new_note_object = { element: <KanbanNote
																				key={new_note_key}
																				id={new_note_key}
																				onDelete={this.handleDelete}>
																			</KanbanNote>,
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
