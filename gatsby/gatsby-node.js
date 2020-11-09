
import path from 'path';

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
    console.log(data)
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


export async function createPages(params) {
    //Create pages dynamically
    // 1. Pizzas
    await createPizzaPages(params);
    // 2. Toppings
    // 3. Slicemasters
}