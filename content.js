const devs = (devs_list) => {
  const table = document.getElementsByTagName('tbody');
  let nodes = table[0].childNodes;
  let table_tr = [];
  let nao_avaliadas = 0;

  nodes.forEach((el, _, __) => {
    if (el.nodeName === 'TR') {
      table_tr.push(el);
    };
  })

  table_tr.forEach((tr, _, __) => {
    let dev_url = tr.firstElementChild.firstElementChild.href.split("/");
    let dev_id = dev_url[dev_url.length - 1]

    if (!devs_list.includes(dev_id.trim())) {
      tr.remove(tr.selectedIndex);
    } else if (devs_list.includes(dev_id.trim())) {
      let entrega_tds = []
      tr.childNodes.forEach((el) => { el.nodeName === 'TD' && entrega_tds.push(el) });
      nao_avaliadas += entrega_tds[4].getElementsByTagName("a").length
    };
  });

  console.log("%cTotal de entregas não avaliadas:", "color: green;", nao_avaliadas);
};

chrome.storage.onChanged.addListener((changes, _) => {
  if (Object.keys(changes).includes("filter")) {
    chrome.storage.sync.get("filter", ({ filter: { set, _ } }) => {
      devs(set)
    });
  }
});
