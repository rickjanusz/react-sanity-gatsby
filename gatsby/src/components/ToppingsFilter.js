import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &.active {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // console.log(pizzas)
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // 1. Check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // 2. if it is, increment by 1
        existingTopping.count += 1;
      } else {
        // 3. else create a new entry in out acc and set it to 1
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // 4.  sort them based on their count
  const sortedToppings = Object.values(counts).sort(
    (b, a) => a.count - b.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // 1. Get a list of all the toppings
  // 2. Get a list of all the Pizza with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  console.clear();
  // console.log({toppings, pizzas});
  // 3. Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  // 4. Loop over the list of toppings and display the topping and the count of pizzas in that topping
  // 5. Link it up

  return (
    <ToppingsStyles>
      <Link to="/pizzas" activeClassName="active">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          to={`/topping/${topping.name}`}
          key={topping.id}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
