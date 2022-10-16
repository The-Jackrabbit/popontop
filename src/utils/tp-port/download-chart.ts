const downloadChart = (): void => {
  const chartData = chartHistory.present;
  const filter = (node: { tagName: string; }) => {
    return (node.tagName !== 'BUTTON');
  };
  setIsChartDownloading(true);

  const chart = document.getElementById('chart');
  
  domtoimage.toPng(chart, {filter: filter}).then((dataUrl: string) => {
    const link = document.createElement('a');
    let fileName = 'MyChart';
    if (chartData.name) fileName = chartData.name;
    else if (chartHistory.present._id) fileName = chartHistory.present._id;
    link.download = `${fileName}.jpeg`;
    link.href = dataUrl;
    link.click();
    link.remove();

    setIsChartDownloading(false);
  });
}
