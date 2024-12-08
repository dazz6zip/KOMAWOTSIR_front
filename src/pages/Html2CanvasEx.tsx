import axios from "axios";
import html2canvas from "html2canvas";
import { useRef } from "react";
import img from "../images/gradient_9.png";

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
      handleUpload();
    }
  };

  const handleUpload = async () => {
    if (captureRef.current) {
      // 1. 캔버스를 Blob로 변환
      const canvas = await html2canvas(captureRef.current);
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((blob) => resolve(blob), "image/png")
      );

      if (!blob) throw new Error("Blob 생성 실패!");

      // 2. FormData에 이미지 추가
      const formData = new FormData();
      formData.append("file", blob, "captured-image.png");
      formData.append("userId", "12"); // 사용자 ID 예제

      // POST 요청
      const response = await axios.post<string>("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // 서버 응답 처리
      alert(response.data);
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
        <h1 style={{ color: "black", margin: "10%" }}></h1>
      </div>

      {/* 다운로드 버튼 */}
      <button onClick={handleDownload}>이미지 다운로드</button>
    </div>
  );
}

export default DownloadableImage;
