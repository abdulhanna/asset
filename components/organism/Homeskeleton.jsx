import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItem = () => {
    return (
        <section>
            <h2 className="section-title">
                <Skeleton duration={1} height={100} />
            </h2>
            {/* <h2 className="section-title mt-4">
                <Skeleton duration={1} height={220} />
            </h2> */}

            {/* <h2 className="section-title mt-4">
                <Skeleton duration={1} height={220} />
            </h2> */}
            <ul className="list  grid grid-cols-4 gap-4 mt-4">
                {Array(36)
                    .fill()
                    .map((item, index) => (
                        <div>
                            <li className="card" key={index}>
                                <Skeleton height={50} />
                            </li>
                        </div>
                    ))}
            </ul>
        </section>
    );
};

export const Fieldskeleton = () => {
    return (
        <section>
            <h2 className="section-title">
                <Skeleton duration={1} height={50} />
            </h2>
            <h2 className="section-title mt-4">
                <Skeleton duration={1} height={80} />
            </h2>

            <h2 className="section-title mt-4">
                <Skeleton duration={1} height={80} />
            </h2>


            <h2 className="section-title mt-4">
                <Skeleton duration={1} height={80} />
            </h2>


            <h2 className="section-title mt-4">
                <Skeleton duration={1} height={80} />
            </h2>

        </section>
    );
}

export const Homeskeleton = () => {
    return (
        <>
            <SkeletonItem />
        </>
    )
}
