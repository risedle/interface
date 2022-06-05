import LogoV2 from "../../../../uikit/layout/LogoV2";
import links from "../../../../utils/links";

export default function Footer() {
    return (
        <div className="mt-24 border-t border-dark-neutral-subtle	bg-dark-background-default	">
            <div className="mx-auto flex max-w-7xl flex-col-reverse justify-between px-6 pt-9 pb-12  sm:flex-row">
                <div className="mt-16 sm:mt-0">
                    <LogoV2 variant="gray" />
                    <p className="paragraph-xs pt-2 text-dark-neutral-soft sm:pt-16">© 2022 Risedle Labs, Inc. All rights reserved.</p>
                </div>
                <div className="w-[300px]">
                    <table className="w-full text-left">
                        <thead className="text-dark-neutral-primary">
                            <tr className="text-xs font-semibold">
                                <th>Product</th>
                                <th>Community</th>
                                <th>Resource</th>
                            </tr>
                        </thead>
                        <tbody className="paragraph-xs text-dark-neutral-soft">
                            <tr>
                                <td className="pt-4">Leverage</td>
                                <td className="pt-4">
                                    <a href={links.discord} target="_blank" rel="noreferrer noopener">
                                        Discord
                                    </a>
                                </td>
                                <td className="pt-4">
                                    <a href={links.docs} target="_blank" rel="noreferrer noopener">
                                        Documentation
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-4">Margin</td>
                                <td className="pt-4">
                                    <a href={links.twitter} target="_blank" rel="noreferrer noopener">
                                        Twitter
                                    </a>
                                </td>
                                <td className="pt-4">
                                    <a href={links.github} target="_blank" rel="noreferrer noopener">
                                        Github
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="pt-4">Boost</td>
                                <td className="pt-4">
                                    <a href={links.blog} target="_blank" rel="noreferrer noopener">
                                        Mirror
                                    </a>
                                </td>
                                <td className="pt-4">Press</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
