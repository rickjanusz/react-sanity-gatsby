import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image'; 
import styled from 'styled-components';
import Pagination from '../components/Pagination';


const SlicemasterGrid = styled.div`
display: grid;
grid-gap: 2rem;
grid-template-columns: repeat(auto-fill, minmax(410px, 1fr));
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
.description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    z-index: 2;

    transform: rotate(1deg);
}
`;

export default function SlicemastersPage({ data, pageContext }) { 
    const slicemasters = data.slicemasters.nodes;
    //console.log(slicemasters); 
     //console.log(data.slicemasters.totalCount);
    return (
        <>
            <Pagination 
                pageSize={process.env.GATSBY_PAGE_SIZE}
                totalCount={data.slicemasters.totalCount} 
                currentPage={pageContext.currentPage || 1} 
                skip={pageContext.skip} 
                base='/slicemasters' />
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
    query($skip: Int = 0, $pageSize: Int = 2) {
        slicemasters: allSanityPerson(limit: $pageSize, skip: $skip) {
          totalCount
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