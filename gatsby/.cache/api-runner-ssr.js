var plugins = [{
      plugin: require('/Users/rjanusz/Sites/master-gatsby-slices/gatsby/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/rjanusz/Sites/master-gatsby-slices/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/rjanusz/Sites/master-gatsby-slices/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"knk9mv58","dataset":"production","watchMode":true,"token":"skVbH9PxUjApRvRRbjwMh6DSvt4SXM3aPiUWcBtD4c0Y5YNWJr66KNUL8FVTLy50KocqVyeBSTqaY3oYWC12VFRWHfZMmlpAqwj3LkceGGUTFoHRC3kAqpST0dTVaWs3lQV3ThGt48OYejkfjSbPeBCekWMOUyliayTCVd4phF65SIFxerOS"},
    },{
      plugin: require('/Users/rjanusz/Sites/master-gatsby-slices/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
