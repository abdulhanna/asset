import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItem = () => {
    return (
        <section>
            <h2 className="section-title">
                <Skeleton duration={1} height={50} />
            </h2>
            {/* <h2 className="section-title mt-4">
                <Skeleton duration={1} height={220} />
            </h2> */}

            {/* <h2 className="section-title mt-4">
                <Skeleton duration={1} height={220} />
            </h2> */}
            <ul className="list  grid grid-cols-5 gap-5 mt-4">
                {Array(35)
                    .fill()
                    .map((item, index) => (
                        <div key={index}>
                            <li className="card p-3" key={index}>
                                <Skeleton height={10} />
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
            <h2 className="section-title mt-4 p-2">
                <Skeleton duration={1} height={30} />
            </h2>

            <h2 className="section-title mt-4 p-2">
                <Skeleton duration={1} height={30} />
            </h2>


            <h2 className="section-title mt-4 p-2">
                <Skeleton duration={1} height={30} />
            </h2>


            <h2 className="section-title mt-4 p-2">
                <Skeleton duration={1} height={30} />
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
