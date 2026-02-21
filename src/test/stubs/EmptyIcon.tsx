import type { SVGProps } from "react";

export default function EmptyIcon(props: SVGProps<SVGSVGElement>) {
  return <svg aria-hidden="true" focusable="false" {...props} />;
}
