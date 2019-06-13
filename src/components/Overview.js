import React, { useEffect } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

const Overview = () => {
  useEffect(() => {
    //
  }, [])

  //prettier-ignore
  const {allEventsJson: { nodes } } = useStaticQuery(
    graphql`
    {
      allEventsJson {
        nodes {
          date
          id
          location
          title
        }
      }
    }
  `)

  return (
    <section className="overview">
      <div className="overview__list">
        {nodes.map((node) => {
          const { id, date, title, location } = node

          return (
            <article className="overview__article" key={id}>
              <time className="overview__time">{date}</time>
              <h1 className="overview__title">{title}</h1>
              <Link to="" className="overview__link">
                {location}
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Overview
