const AddButton = ({disabled, onClick}) => {
    console.log('renders <AddButton />');
  
    return(
      <p>
        <button disabled={disabled} onClick={onClick}>
          カートに追加する
        </button>
      </p>
    )
}

export default AddButton  