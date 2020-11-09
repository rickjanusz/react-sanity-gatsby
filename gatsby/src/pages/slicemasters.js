import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image'; 
import styled from 'styled-components';


const SlicemasterGrid = styled.div`
display: grid;
grid-gap: 2rem;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;



const SingleSlicemaster = styled.div`
a {
    text-decoration: none;
}
.gatsby-image-wrapper {
    height: 400px;
}
h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;

}
`;

export default function SlicemastersPage({ data }) { 
    const slicemasters = data.slicemasters.nodes;
    console.log(slicemasters); 
    return (
        <>
            <SlicemasterGrid>
                {slicemasters.map((person) => (
                    <SingleSlicemaster>
                    <Link to={`/slicemasters/${person.slug.current}`}>
                        <h2>
                            <span className="mark">
                                {person.name}
                            </span>
                        </h2>
                    </Link>

                    <Img fluid={person.image.asset.fluid} />
                    <p className="description">{person.description}</p>
                    </SingleSlicemaster>
                ))}
            </SlicemasterGrid>
        </>
    );
}

export const query = graphql`
    query {
        slicemasters: allSanityPerson {
          nodes {
            id
            name
            slug {
              current
            }
            description
            image {
              asset {
                fluid(maxWidth: 410) {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
    }
`;