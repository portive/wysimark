import type { Content, Image, Link, Parent, Root } from "mdast"
import { definitions } from "mdast-util-definitions"
import type { Node } from "unist"
import { SKIP, visit } from "unist-util-visit"

/**
 * Based on the code from `remark-inline-links` but rewritten here because, for
 * reasons unknown to me, the plugin doesn't seem to execute at all despite not
 * throwing an error. Looks like the function that `remarkInlineLinks` returns
 * is never executed. Not sure if this is due to a change in `unified` but I
 * can't seem to find any mention anywhere of this no longer working including
 * in discussion or issues and the list of plugins show that
 * `remark-inline-links` is currently working and compatible with the lateste
 * version.
 *
 * Never-the-less, pulling it out and working on the ast directly (this function
 * modifies the AST in place) seems to work.
 *
 * https://github.com/remarkjs/remark-inline-links
 */
export function transformInlineLinks(tree: Root): void {
  const definition = definitions(tree)

  visit<Node>(tree as Node, (n, index, p) => {
    const node = n as unknown as Content
    const parent = p as unknown as Parent | null
    if (
      node.type === "definition" &&
      parent !== null &&
      typeof index === "number"
    ) {
      parent.children.splice(index, 1)
      return [SKIP, index]
    }

    if (node.type === "imageReference" || node.type === "linkReference") {
      const identifier =
        "identifier" in node && typeof node.identifier === "string"
          ? node.identifier
          : ""
      const def = definition(identifier)

      if (def && parent !== null && typeof index === "number") {
        const replacement: Image | Link =
          node.type === "imageReference"
            ? { type: "image", url: def.url, title: def.title, alt: node.alt }
            : {
                type: "link",
                url: def.url,
                title: def.title,
                children: node.children,
              }

        parent.children[index] = replacement
        return [SKIP, index]
      }
    }
  })
}
