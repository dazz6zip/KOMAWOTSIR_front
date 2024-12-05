import html2canvas from "html2canvas";
import { useRef } from "react";
import img from "../images/imsi.jpg";

function DownloadableImage() {
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current);
      const dataURL = canvas.toDataURL("image/png"); // PNG 형식 이미지
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "downloaded-image.png";
      link.click();
    }
  };

  return (
    <div>
      {/* 캡처할 영역 */}
      <div
        ref={captureRef}
        style={{
          width: "500px",
          height: "300px",
          position: "relative",
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1 style={{ color: "black", margin: "10%" }}>
          배경 이미지 위의 텍스트
        </h1>
      </div>

      {/* 다운로드 버튼 */}
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  );
}

export default DownloadableImage;
