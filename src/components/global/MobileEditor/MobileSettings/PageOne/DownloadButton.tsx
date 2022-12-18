// import domtoimage from 'dom-to-image-more';
import * as htmlToImage from 'html-to-image';
import Button from '../../../../lib/Button/Button';

const DownloadButton: React.FC = () => {
  const downloadChart = (): void => {
    if (window) {
      const chart = document.getElementById('mobile-chart');

      if (!chart) {
        return;
      }

      htmlToImage
        .toPng(chart, {
          cacheBust: true,
        })
        .then(function (dataUrl) {
          const img = new Image();
          img.src = dataUrl;
          document.body.appendChild(img);
          const link = document.createElement('a');
          link.download = 'my-image-name.png';
          link.href = dataUrl;
          link.click();
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }
  };

  return <Button onClick={() => downloadChart()}>Download chart</Button>;
};

export default DownloadButton;
