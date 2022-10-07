import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
   <ContentLoader
      className="pizza-block"
      speed={2}
      width={300}
      height={500}
      viewBox="0 0 300 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
   >
      <circle cx="135" cy="128" r="125" />
      <rect x="0" y="265" rx="12" ry="12" width="280" height="18" />
      <rect x="1" y="301" rx="15" ry="15" width="280" height="88" />
      <rect x="4" y="411" rx="15" ry="15" width="88" height="27" />
      <rect x="130" y="400" rx="20" ry="20" width="150" height="44" />
   </ContentLoader>
)

export default Skeleton

