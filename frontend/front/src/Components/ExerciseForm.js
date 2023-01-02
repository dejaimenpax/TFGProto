const ExerciseForm = (props) => {
    return(
        <form onSubmit={props.addExercise}>

        <div>topic: 
          <input 
            value={props.newTopic}
            onChange={props.handleTopicChange}
          />
        </div>

        <div>content:
          <input 
            value={props.newContent}
            onChange={props.handleContentChange}
          />
        </div>

        <div>score:
          <input 
            value={props.newScore}
            onChange={props.handleScoreChange}
          />
        </div>

        <div><button type="submit">add</button></div>

      </form>
    )
}

export default ExerciseForm