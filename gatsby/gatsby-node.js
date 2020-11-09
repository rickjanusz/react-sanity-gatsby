
import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function createPizzaPages({ graphql, actions}) {
    // 1. Get a template for this page
    const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
    // 2. Query pizzas
    const { data } = await graphql(`
        query {
          pizzas: allSanityPizza {
            nodes {
              name
              slug {
                current
              }
            }
          }
        }
    `);
    //console.log(data)
    // 3. Loop through pizzas to create individual pages
    data.pizzas.nodes.forEach(pizza => {
        actions.createPage({
            // What is the URL for this new page
            path: `pizza/${pizza.slug.current}`,
            component: pizzaTemplate,
            context: {
                slug: pizza.slug.current,
            }
        });

    })
}

async function createToppingsPizzaPages({ graphql, actions}) {
    // 1. Get a template for this page
    const toppingTemplate = path.resolve('./src/pages/pizzas.js');
    // 2. Query toppings
    const { data } = await graphql(`
      query {
        toppings: allSanityTopping {
          nodes {
            name
            id
          }
        }
      }
    `);
    // 3. Loop through toppings to create individual pages
    data.toppings.nodes.forEach((topping) => {
        actions.createPage({
            path: `topping/${topping.name}`,
            component: toppingTemplate,
            context: {
                topping: topping.name,
                toppingRegex: `/${topping.name}/i`
            }
        });
    });
    // 4. Pass topping data tp pizza.js
}

async function fetchBeersAndTurnIntoNodes({ actions, createNodeId, createContentDigest}) {
    // fetch a list of beers
    const res = await fetch('https://sampleapis.com/beers/api/ale');
    const beers = await res.json();
    // loop over each one
    for (const beer of beers) {
        // create a node for each beer   
        const nodeMeta = {
            id: createNodeId(`beer-${beer.name}`),
            parent: null,
            children: null,
            internal: {
                type: 'Beer',
                mediaType: 'application/json',
                contentDigest: createContentDigest(beer),
            }
        };
        // create a node for THAT beer
        actions.createNode({
            ...beer,
            ...nodeMeta,
        })
    }
    
}

export async function sourceNodes(params) {
    // fetch a list of coffees and source them into our Gatsby API
    await Promise.all([
        fetchBeersAndTurnIntoNodes(params),
    ]);
}



export async function createPages(params) {
    //Create pages dynamically
    // Wait for all promises to be resolved before finishing this function
    await Promise.all([
        createPizzaPages(params),
        createToppingsPizzaPages(params)
    ]) 
    // 1. Pizzas
    // 2. Toppings
    // 3. Slicemasters
}
