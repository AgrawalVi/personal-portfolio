import React from "react"
import { BentoGrid, BentoGridItem } from "@/components/aceternity/bento-grid"
import { gridItems } from "@/data"

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="w-full">
        {gridItems.map(
          ({
            id,
            title,
            description,
            className,
            img,
            imgClassName,
            titleClassName,
            spareImg,
          }) => (
            <BentoGridItem
              id={id}
              key={id}
              title={title}
              titleClassName={titleClassName}
              description={description}
              className={className}
              img={img}
              imgClassName={imgClassName}
              spareImg={spareImg}
            />
          )
        )}
      </BentoGrid>
    </section>
  )
}

export default Grid
