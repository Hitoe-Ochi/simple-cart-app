import { Suspense, lazy, useCallback, memo, useMemo, useState } from "react";

const AddButton = lazy(() => import('./AddButton'))

const App = () => {
  console.log('renders <App />');

  const [item, setItem] = useState('')
  const [carItems, setCarItems] = useState([])

  console.log('carItems: ' + carItems);


  const handleChange = useCallback(
    (event) => {
      setItem(event.target.value)
    },
    []
  ) 

  const handleAdd = useCallback(() => {
    if (carItems.includes(item)) {
      return
    }
    setCarItems((items) => [...items, item])
    setItem('')
  },[carItems, item])

  const handleClear = useCallback( () => {
    setCarItems([])
  }, [])
  

  return (
    <div style={{ margin: '10px'}}>
      <h1>商品を購入</h1>
      <Input value={item} onChange={handleChange} />
      <Suspense fallback={<div>Loading...</div>}>
        <AddButton disabled={item.trim()==''} onClick={handleAdd}/>
      </Suspense>
      <ul>
        {
          carItems.map(
            (i) => (
              <li key={i}>{i}</li>
            )
          )
        }
      </ul>
      <Total carItems={carItems}/>
      <ClearButton onClick={handleClear}/>
    </div>
  )
  
}

const Input = ({value, onChange}) => {
  console.log('renders <Input />');
  
  return(
    <p>
      <label>
        アイテム名： <input type="text" value={value} onChange={onChange} />
      </label>
    </p>
  )
}

const Total = ({carItems}) => {
  console.log('renders <Total />');

  const total = carItems.reduce((acc, cur) => {
      const t = Date.now()

      // while (Date.now()-t < 100) {
      // }
      return cur.length*100+acc
  }, 0)

  return <p>合計：{total}円</p>
}

const ClearButton = memo(({onClick}) => {
  console.log('renders <ClearButton />');

  return(
    <p>
      <button onClick={onClick}>カートを空にする</button>
    </p>
  )
})

export default App