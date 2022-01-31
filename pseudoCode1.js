function lookForKey(mainBox) {
  const pile = mainBox.makePileToLookThrough();
  while (pile.length) {
    const box = pile.grabBox();
    for (const item of box) {
      if (item.isBox()) {
        pile.push(item);
      } else if (item.isKey()) {
        console.log("found the key");
      }
    }
  }
}
