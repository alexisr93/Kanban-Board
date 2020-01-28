class KanbanNote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			kanban_note_text: this.props.noteText,
			kanban_note_id: this.props.id,
			kanban_column_id: this.props.columnId
		}
		this.handleDelete = this.handleDelete.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMove = this.handleMove.bind(this);
	}

	handleMove(event) {
		let toColumn = event.target.getAttribute('value');
		if (this.state.kanban_column_id === toColumn) return;
		this.props.onMove(this.state.kanban_note_id, this.state.kanban_note_text, toColumn);
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
		let isActive = this.state.kanban_column_id;
		let buttons = "";

		if (isActive === "left") {
			buttons = (
				<div className="nav justify-content-end">
					<a
						className="btn btn-outline-secondary active"
						href="#"
						value="left"
						onClick={this.handleMove}>
					</a>
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="center"
						onClick={this.handleMove}>
					</a>
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="right"
						onClick={this.handleMove}>
					</a>
				</div>
			);
		}

		if (isActive === "center") {
			buttons = (
				<div className="nav justify-content-end">
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="left"
						onClick={this.handleMove}>
					</a>
					<a
						className="btn btn-outline-secondary active"
						href="#"
						value="center"
						onClick={this.handleMove}></a>
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="right"
						onClick={this.handleMove}>
					</a>
				</div>
			);
		}

		if (isActive === "right") {
			buttons = (
				<div className="nav justify-content-end">
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="left"
						onClick={this.handleMove}>
					</a>
					<a
						className="btn btn-outline-secondary"
						href="#"
						value="center"
						onClick={this.handleMove}>
					</a>
					<a
						className="btn btn-outline-secondary active"
						href="#"
						value="right"
						onClick={this.handleMove}>
					</a>
				</div>
			);
		}

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
									data-target={"#" + "editNoteModal" + this.state.kanban_note_id}>
								</a>
								<a
									href="#"
									className="btn btn-outline-danger"
									onClick={this.handleDelete}>
								</a>
							</div>
						</div>
						<div className="col-7">
							{buttons}
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
				        <button
									type="button"
									className="close"
									data-dismiss="modal"
									aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
							<form>
					      <div className="modal-body">
					      	<textarea
										className="form-control"
										value={this.state.kanban_note_text}
										onChange={this.handleChange}></textarea>
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
			notes_in_column: this.props.notes.filter(note => note.column == this.props.columnId),
		}
		this.handleNewNote = this.handleNewNote.bind(this);
	}

	componentDidUpdate(prevProps){
		if (this.props.notes !== prevProps.notes){
			this.setState({
				notes_in_column: this.props.notes.filter(note => note.column == this.props.columnId)
			});
		}
	}

	handleNewNote() {
		this.props.newNote(this.props.columnId);
	}

	render() {
		console.log(this.state.notes_in_column);
		let notes = this.state.notes_in_column.map(note => (
			<KanbanNote
				key={note.element.key}
				noteText={note.element.noteText}
				id={note.element.id}
				columnId={note.element.columnId}
				onDelete={note.element.onDelete}
				onMove={note.element.onMove}>
			</KanbanNote>
		));
  	return (
    	<div className="col-md-4 col-lg-2">
				<div className="bg-light px-2 pt-2 pb-3 rounded-lg">
					<h5 className="text-center font-weight-normal">{this.props.title}</h5>
					{notes}
					<div className="row" id="kanban-column-options">
						<div className="col text-center">
							<a
								href="#"
								className="btn btn-outline-primary"
								onClick={this.handleNewNote}>
								New Note
							</a>
						</div>
					</div>
				</div>
      </div>
    );
  }
}

class KanbanBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			columns: [],
		}

		this.handleNewNote = this.handleNewNote.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleMove = this.handleMove.bind(this);
	}
	componentDidMount() {
		this.localStorageGet()
	}
	handleMove(id, noteText, toColumn) {
		let new_note_key = Date.now();
		let new_note_object = {
			element: {
				key: new_note_key,
				noteText: noteText,
				id: new_note_key,
				columnId: toColumn,
				onDelete: this.handleDelete,
				onMove: this.handleMove
			},
			key: new_note_key,
			column: toColumn
		}
		this.setState({
			notes: [...this.state.notes.filter(note => note.key != id), new_note_object]
		}, () => {
			this.localStorageSet();
		});

	}

	handleDelete(id) {
		this.setState({
			notes: this.state.notes.filter(note => note.key != id)
		}, () => {
			this.localStorageSet();
		});

	}

	handleNewNote(inColumn, noteText) {
		let new_note_key = Date.now();
		let new_note_object = {
			element: {
				key: new_note_key,
				noteText: noteText,
				id: new_note_key,
				columnId: inColumn,
				onDelete: this.handleDelete,
				onMove: this.handleMove
			},
			key: new_note_key,
			column: inColumn
		}
		this.setState({
			notes: [...this.state.notes, new_note_object]
		}, () => {
			this.localStorageSet();
		});
	}

	localStorageSet() {
		let notes_to_store = JSON.stringify(this.state.notes, (key, value) => {
			if (key === "element") {
				return value;
			}
			return value;
		});

		localStorage.setItem("notes", notes_to_store);
	}

	localStorageGet() {
		if (localStorage.getItem("notes") != null) {
			this.setState({
				notes: JSON.parse(localStorage.getItem("notes"))
			});
		}
	}

	render() {
  	return (
    	<div className="container-fluid">
				<div className="row justify-content-center">
					<KanbanColumn
						key="left"
						columnId="left"
						title="Todo"
						onMove={this.handleMove}
						newNote={this.handleNewNote}
						notes={this.state.notes}>
					</KanbanColumn>
					<KanbanColumn
						key="center"
						columnId="center"
						title="Pending"
						onMove={this.handleMove}
						newNote={this.handleNewNote}
						notes={this.state.notes}>
					</KanbanColumn>
					<KanbanColumn
						key="right"
						columnId="right"
						title="Done"
						onMove={this.handleMove}
						newNote={this.handleNewNote}
						notes={this.state.notes}>
					</KanbanColumn>
				</div>
      </div>
    );
  }
}

ReactDOM.render(<KanbanBoard/>, document.querySelector("#app"))
