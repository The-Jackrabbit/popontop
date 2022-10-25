
import domtoimage from 'dom-to-image-more';
import dynamic from 'next/dynamic'
import * as htmlToImage from 'html-to-image';
const DownloadButton: React.FC = () => {
  const downloadChart = (): void => {

    
    function filter(node) {
      // return node.tagName !== "i";
    }
    if (window) {
      
      const chart = document.getElementById('mobile-chart');
      htmlToImage.toPng(chart, {
        style: {
          // backgroundColor: 'red',
        },
        cacheBust: true,
      })
        .then(function (dataUrl) {
          const link = document.createElement('a');
    link.download = 'my-image-name.png';
    link.href = dataUrl;
    link.click();
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }


 
  }

  return (
    <button onClick={() => downloadChart()}>Download chart</button>
  );
};


export default DownloadButton;