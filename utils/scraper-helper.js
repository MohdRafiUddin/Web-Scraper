const isMid = (i, link) => {
  // Return false if there is no href attribute.
  if (typeof link.attribs.href === "undefined") {
    return false;
  }

  return link.attribs.href.includes(".mid");
};

const noParens = (i, link) => {
  // Regular expression to determine if the text has parentheses.
  const parensRegex = /^((?!\().)*$/;
  return parensRegex.test(link.children[0].data);
};
