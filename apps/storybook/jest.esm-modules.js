/**
 * IMPORTANT!
 *
 * I have figured out a way to make `ts-jest` work with esm but it is kludgy
 * but it works.
 *
 * I have NOT figured out how to make it play nicely with Next.js so we
 * probably shouldn't use this support yet. That said, I don't want to remove
 * this code.
 *
 * For clarity, Next11 should optionally support ESM with a flag here:
 *
 * https://nextjs.org/blog/next-11-1
 *
 * That said, I'm treading cautiously to maintain backwards compatibility with
 * older projects and feel like maybe we should give it another year before
 * we assume our downline customers are all using esm.
 *
 * NOTE:
 *
 * Unfortunately, Jest can't automatically handle `esm` modules. Part of
 * supporting them is to explicitly identify the `esm` modules and add them
 * here.
 *
 * https://github.com/kulshekhar/ts-jest/issues/970
 *
 * Enter the package names of any `esm` only packages here.
 */
module.exports = []
