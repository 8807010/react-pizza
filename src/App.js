import React, {useEffect, useState} from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import Skeleton from "./components/PizzaBlock/Skeleton";
import './scss/app.scss';

function App() {
  const [items,setItems] = useState([]);
  // const [isLoading, setIsLoading]= useState(true);

  useEffect(() => {
    fetch('https://629bc30acf163ceb8d1d9f29.mockapi.io/items')
    .then((res)=> res.json())
    .then((arr) => {
      setItems(arr);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((obj) => 
                <Skeleton key={obj.id} {...obj}
                  // title={obj.title}
                  // price={obj.price}
                  // imageUrl={obj.imageUrl} 
                  // sizes={obj.sizes}
                  // types={obj.types}
                  />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
