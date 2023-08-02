const container = document.querySelector('#summary > tbody');

const summaryToTableRows = (summary) =>
  Object.entries(summary).map(([category, count]) => {
    const tr = document.createElement('tr');

    const tdCategory = document.createElement('td');
    tdCategory.appendChild(document.createTextNode(category));

    const tdCount = document.createElement('td');
    tdCount.appendChild(document.createTextNode(count));

    tr.append(tdCategory, tdCount);
    return tr;
  });

const SummaryContainer = {
  clear() {
    container.innerHTML = '';
  },

  append(summary) {
    container.append(...summaryToTableRows(summary));
  },
};

export default SummaryContainer;
