import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function SlicemasterPage({ data: {person}}) {
  return (
        <>
        <div className="center">
          <Img fluid={person.image.asset.fluid} />
            <h1 className="mark">{person.name}</h1>
            <p className="description">{person.description}</p>
        </div>
        </>
  );
}


export const query = graphql`
  query($slug: String!) {
  person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      description
      image {
        asset {
          fluid(maxWidth: 800, maxHeight:550) {
            ...GatsbySanityImageFluid
          }
        }
      }
    
  }
  
}`;

