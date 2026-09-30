'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  ZoomIn, ZoomOut, Download, Share2, Upload, RotateCcw, ImageIcon, Trash2
} from 'lucide-react';

interface BadgePageProps {
  onNavigateHome?: () => void;
}

type BadgeFormat = 'post' | 'story';

// POST  = 1080×1350  (4:5 portrait, matching reference)
// STORY = 1080×1920  (9:16 portrait story)
const FORMAT_CONFIG: Record<BadgeFormat, { cw: number; ch: number; label: string; aspect: string }> = {
  post: { cw: 1080, ch: 1350, label: 'POST', aspect: '4/5' },
  story: { cw: 1080, ch: 1920, label: 'STORY', aspect: '9/16' },
};

export const BadgePage: React.FC<BadgePageProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1.0);                 // multiplier 1.0 – 3.0
  const [offset, setOffset] = useState({ x: 0, y: 0 });  // px offset on preview
  const [format, setFormat] = useState<BadgeFormat>('post'); // POST active by default matching reference
  const [isDragging, setIsDragging] = useState(false);
  const [dragOrigin, setDragOrigin] = useState({ mx: 0, my: 0, ox: 0, oy: 0 });
  const [isGenerating, setIsGenerating] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const userImgRef = useRef<HTMLImageElement | null>(null);
  const sampleImgRef = useRef<HTMLImageElement | null>(null);
  const awsLogoRef = useRef<HTMLImageElement | null>(null);

  // User must enter Name, Email, and upload their own Photo to enable download/share
  const isComplete = name.trim() !== '' && email.trim() !== '' && photo !== null;

  // ─── Load AWS logo on initial render ───────────────────────────
  useEffect(() => {
    const logo = new Image();
    logo.onload = () => {
      awsLogoRef.current = logo;
      redraw();
    };
    logo.src = '/aws_logo.svg';
  }, []);

  // ─── Load sample portrait on initial render ────────────────────
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      sampleImgRef.current = img;
      redraw();
    };
    img.src = '/badge-sample-portrait.jpg';
  }, []);

  // ─── Load user photo when selected ─────────────────────────────
  useEffect(() => {
    if (!photo) {
      userImgRef.current = null;
      redraw();
      return;
    }
    const img = new Image();
    img.onload = () => {
      userImgRef.current = img;
      redraw();
    };
    img.src = photo;
  }, [photo]);

  // ─── Core draw function ────────────────────────────────────────
  const redraw = useCallback(() => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const { cw, ch } = FORMAT_CONFIG[format];
    cvs.width = cw;
    cvs.height = ch;

    // Active image: user's photo if uploaded, otherwise fallback to sample portrait
    const activeImg = userImgRef.current || sampleImgRef.current;

    drawBadgeTemplate(ctx, cw, ch, activeImg, name, zoom, offset, format, awsLogoRef.current);
  }, [name, zoom, offset, format]);

  // ─── Redraw on state change ────────────────────────────────────
  useEffect(() => {
    redraw();
  }, [redraw]);

  // ─── File select ──────────────────────────────────────────────
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setPhoto(ev.target.result as string);
        setOffset({ x: 0, y: 0 });
        setZoom(1.0);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // ─── Fit to frame ─────────────────────────────────────────────
  const fitToFrame = () => {
    setOffset({ x: 0, y: 0 });
    setZoom(1.0);
  };

  // ─── Clear Form (Resets to sample portrait) ────────────────────
  const handleClearForm = () => {
    setName('');
    setEmail('');
    setPhoto(null);
    setZoom(1.0);
    setOffset({ x: 0, y: 0 });
  };

  // ─── Drag on canvas ───────────────────────────────────────────
  const getXY = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: t.clientX, y: t.clientY };
    }
    return { x: (e as React.MouseEvent).clientX, y: (e as React.MouseEvent).clientY };
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getXY(e);
    setIsDragging(true);
    setDragOrigin({ mx: x, my: y, ox: offset.x, oy: offset.y });
  };

  const onDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const { x, y } = getXY(e);
    setOffset({
      x: dragOrigin.ox + (x - dragOrigin.mx),
      y: dragOrigin.oy + (y - dragOrigin.my),
    });
  };

  const onDragEnd = () => setIsDragging(false);

  // ─── Download ─────────────────────────────────────────────────
  const handleDownload = () => {
    if (!isComplete) return;
    setIsGenerating(true);
    setTimeout(() => {
      const cvs = canvasRef.current;
      if (!cvs) {
        setIsGenerating(false);
        return;
      }
      const url = cvs.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `AWS-SCD-Mysuru-2026-${name.trim().replace(/\s+/g, '-')}.png`;
      link.href = url;
      link.click();
      setIsGenerating(false);
    }, 50);
  };

  // ─── Share ────────────────────────────────────────────────────
  const handleShare = () => {
    if (!isComplete) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    cvs.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'aws-mysuru-badge.png', { type: 'image/png' });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'AWS Student Community Day Mysuru 2026',
          text: `I'm Attending AWS Student Community Day Mysuru 2026! #AWSMysuru2026`,
          files: [file],
        }).catch(() => {/* cancelled */ });
      } else {
        try {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          alert('Badge copied to clipboard!');
        } catch {
          handleDownload();
        }
      }
    }, 'image/png');
  };

  const zoomPct = Math.round(zoom * 100);

  return (
    <div className="min-h-screen bg-[#EFF0F3]">
      <div className="mx-auto max-w-[1360px] px-5 pb-20 pt-28 sm:px-8 md:px-10 lg:px-16">

        {/* ── Page heading ── */}
        <div className="mb-8">
          <p className="mb-1 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#23303E]">
            Social Badge
          </p>
          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-tight text-[#23303E] sm:text-5xl">
            Show you're part of AWS<br />
            Student Community Day Mysuru.
          </h1>
          <p className="mt-3 max-w-xl font-sans text-sm leading-relaxed text-[#3A8C7E]">
            Generate personalized social cards to let your network know you're attending, speaking, volunteering or supporting the community.
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">

          {/* ═══ LEFT — Form ═══════════════════════════════════════ */}
          <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0">
            <div className="border border-[#D0D5DD] bg-white p-6 sm:p-8">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="badge-name" className="mb-1.5 block font-sans text-sm font-medium text-[#23303E]">
                    Full Name<span className="text-[#E74C3C]">*</span>
                  </label>
                  <input
                    id="badge-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="RENATE REINSVE"
                    className="w-full border border-[#D0D5DD] bg-[#F9FAFB] px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-[#23303E] placeholder-[#9CA3AF] outline-none focus:border-[#23303E] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="badge-email" className="mb-1.5 block font-sans text-sm font-medium text-[#23303E]">
                    Email Address<span className="text-[#E74C3C]">*</span>
                  </label>
                  <input
                    id="badge-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="RENATEREINSVE@GMAIL.COM"
                    className="w-full border border-[#D0D5DD] bg-[#F9FAFB] px-3 py-2.5 font-mono text-xs uppercase tracking-widest text-[#23303E] placeholder-[#9CA3AF] outline-none focus:border-[#23303E] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Upload Photo */}
              <div className="mt-5">
                <label className="mb-1 block font-sans text-sm font-medium text-[#23303E]">
                  Upload Photo<span className="text-[#E74C3C]">*</span>
                </label>
                <p className="mb-2 font-sans text-xs text-[#3A8C7E]">
                  Upload a clear headshot or portrait photo with a solid background.
                </p>
                {/* Upload zone */}
                <div className="flex items-center border border-dashed border-[#D0D5DD] bg-[#F9FAFB]">
                  <div className="flex flex-1 items-center gap-3 px-3 py-3 overflow-hidden">
                    <ImageIcon className="h-4 w-4 shrink-0 text-[#6B7280]" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#6B7280] truncate">
                      {photo ? 'Photo uploaded — click to replace' : 'PNG or JPG recommended. Larger images look crisper.'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex shrink-0 items-center gap-1.5 border-l border-[#D0D5DD] bg-white px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#23303E] transition-colors hover:bg-[#F3F4F6]"
                  >
                    Upload Photo
                    <Upload className="h-3.5 w-3.5" />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    className="sr-only"
                  />
                </div>
              </div>

              {/* Zoom / Adjust */}
              <div className="mt-5">
                <p className="mb-1 font-sans text-sm font-medium text-[#23303E]">Zoom/Adjust Image</p>
                <p className="mb-2 font-sans text-xs text-[#3A8C7E]">
                  Your photo keeps its original proportions. Drag to reposition it or use the slider to zoom in.
                </p>
                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 border border-[#D0D5DD] bg-white p-2.5">
                  <div className="flex items-center gap-2 flex-1 min-w-[140px]">
                    <button
                      type="button"
                      aria-label="Zoom out"
                      onClick={() => setZoom((z) => Math.max(1.0, Number((z - 0.1).toFixed(2))))}
                      className="shrink-0 text-[#6B7280] hover:text-[#23303E] transition-colors"
                    >
                      <ZoomOut className="h-4 w-4" />
                    </button>
                    <input
                      type="range"
                      min={100}
                      max={300}
                      value={zoomPct}
                      onChange={(e) => setZoom(Number(e.target.value) / 100)}
                      className="h-1 flex-1 min-w-0 cursor-pointer accent-[#23303E]"
                    />
                    <button
                      type="button"
                      aria-label="Zoom in"
                      onClick={() => setZoom((z) => Math.min(3.0, Number((z + 0.1).toFixed(2))))}
                      className="shrink-0 text-[#6B7280] hover:text-[#23303E] transition-colors"
                    >
                      <ZoomIn className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={fitToFrame}
                    className="flex shrink-0 items-center justify-center gap-1 border border-[#D0D5DD] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-[#23303E] hover:bg-[#F9FAFB] transition-colors whitespace-nowrap"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Fit to Frame
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!isComplete || isGenerating}
                  className={`flex items-center justify-center gap-2 border px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-all ${isComplete
                      ? 'cursor-pointer border-[#23303E] bg-white text-[#23303E] hover:bg-[#F9FAFB]'
                      : 'cursor-not-allowed border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]'
                    }`}
                >
                  {isGenerating ? 'Generating…' : (
                    <>
                      Download Image
                      <Download className="h-3.5 w-3.5 shrink-0" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={!isComplete}
                  className={`flex items-center justify-center gap-2 px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-widest transition-all ${isComplete
                      ? 'cursor-pointer bg-[#23303E] text-white hover:bg-[#1a2530]'
                      : 'cursor-not-allowed bg-[#9CA3AF] text-white'
                    }`}
                >
                  Share on Social
                  <Share2 className="h-3.5 w-3.5 shrink-0" />
                </button>
              </div>

              {/* Clear Form button (active when user changed inputs or uploaded photo) */}
              {(photo || name || email) && (
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#E74C3C] hover:text-[#C0392B] transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear Form
                  </button>
                </div>
              )}

              {/* Helper text matching reference */}
              <p className="mt-4 font-sans text-xs text-[#3A8C7E]">
                {isComplete
                  ? 'Your personalized badge is ready to download or share!'
                  : 'Complete your name, email, and photo to enable the download. Upload a photo to replace the template portrait.'}
              </p>
            </div>
          </div>

          {/* ═══ RIGHT — Preview ═══════════════════════════════════ */}
          <div className="flex flex-1 flex-col items-center w-full">

            {/* POST / STORY tabs spanning full width of preview container */}
            <div className="flex w-full border border-[#D0D5DD]">
              {(['post', 'story'] as BadgeFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormat(f)}
                  className={`flex-1 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${format === f
                      ? 'bg-[#23303E] text-white'
                      : 'bg-white text-[#23303E] hover:bg-[#F9FAFB]'
                    }`}
                >
                  {FORMAT_CONFIG[f].label}
                </button>
              ))}
            </div>

            {/* Preview container with gray frame matching reference */}
            <div className="flex w-full items-center justify-center border-x border-b border-[#D0D5DD] bg-[#E5E7EB] p-4 sm:p-6 md:p-8">
              <div
                className="relative overflow-hidden bg-black shadow-2xl transition-all duration-300"
                style={{
                  aspectRatio: format === 'post' ? '4/5' : '9/16',
                  width: format === 'post' ? 'min(100%, 460px)' : 'min(100%, 370px)',
                  maxHeight: 'min(72vh, 600px)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                }}
              >
                <canvas
                  ref={canvasRef}
                  className="block h-full w-full object-contain select-none"
                  onMouseDown={onDragStart}
                  onMouseMove={onDragMove}
                  onMouseUp={onDragEnd}
                  onMouseLeave={onDragEnd}
                  onTouchStart={onDragStart}
                  onTouchMove={onDragMove}
                  onTouchEnd={onDragEnd}
                />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
//  Badge template draw function — matches reference design
// ═══════════════════════════════════════════════════════════════
function drawBadgeTemplate(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  img: HTMLImageElement | null,
  name: string,
  zoom: number,
  offset: { x: number; y: number },
  format: BadgeFormat,
  awsLogo?: HTMLImageElement | null,
) {
  // Clear canvas
  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.fillStyle = '#1A2530';
  ctx.fillRect(0, 0, W, H);

  // Draw Photo
  if (img && img.complete && img.naturalWidth > 0) {
    const baseScale = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const scale = baseScale * zoom;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;

    // Center image + user offset (scaled relative to canvas coordinates)
    const previewScale = W / 440;
    const dx = (W - dw) / 2 + offset.x * previewScale;
    const dy = (H - dh) / 2 + offset.y * previewScale;

    ctx.save();
    // Reference applies a high-contrast black & white grayscale treatment
    try {
      ctx.filter = 'grayscale(100%) contrast(110%) brightness(95%)';
    } catch {
      // fallback if filter not supported
    }
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  } else {
    // Placeholder background if image is still loading
    ctx.fillStyle = '#23303E';
    ctx.fillRect(0, 0, W, H);
  }

  // ─── Top Header Bar Overlay ───
  // Subtle top vignette to ensure logos and text are 100% legible over any photo
  const topGrad = ctx.createLinearGradient(0, 0, 0, H * 0.16);
  topGrad.addColorStop(0, 'rgba(10, 18, 28, 0.85)');
  topGrad.addColorStop(0.65, 'rgba(10, 18, 28, 0.4)');
  topGrad.addColorStop(1, 'rgba(10, 18, 28, 0)');
  ctx.fillStyle = topGrad;
  ctx.fillRect(0, 0, W, H * 0.16);

  // Top-Left: Official AWS Logo (balanced, shorter size)
  const logoW = W * 0.13;       // logo width: ~13% of canvas width (shorter and balanced)
  const logoH = logoW * (182 / 304); // preserve SVG aspect ratio (304×182)
  const logoX = W * 0.05;
  const logoY = H * 0.032;

  ctx.save();
  if (awsLogo && awsLogo.complete && awsLogo.naturalWidth > 0) {
    // Draw official AWS logo — tint white via composite trick
    ctx.globalCompositeOperation = 'source-over';
    // Draw a white-tinted version: draw to temp canvas, colorize, then draw here
    const tmp = document.createElement('canvas');
    tmp.width = Math.round(logoW);
    tmp.height = Math.round(logoH);
    const tctx = tmp.getContext('2d')!;
    tctx.drawImage(awsLogo, 0, 0, tmp.width, tmp.height);
    // Colorize to white (keep alpha, set RGB to white)
    tctx.globalCompositeOperation = 'source-in';
    tctx.fillStyle = '#FFFFFF';
    tctx.fillRect(0, 0, tmp.width, tmp.height);
    ctx.drawImage(tmp, logoX, logoY, logoW, logoH);
  } else {
    // Fallback: plain text if logo not loaded
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(W * 0.032)}px "Inter", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('aws', logoX, logoY);
  }
  ctx.restore();

  // Top-Right: AWS Student Community Day Branding
  ctx.save();
  ctx.textAlign = 'right';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.round(W * 0.024)}px "Inter", sans-serif`;
  ctx.fillText('aws', W * 0.94, H * 0.046);
  ctx.font = `bold ${Math.round(W * 0.015)}px "Inter", sans-serif`;
  ctx.fillText('STUDENT COMMUNITY DAY', W * 0.94, H * 0.063);
  ctx.font = `600 ${Math.round(W * 0.014)}px "Inter", sans-serif`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('MYSURU 2026', W * 0.94, H * 0.078);
  ctx.restore();

  // ─── Bottom Curved Wave Gradient Overlay (Magenta → Orange) ───
  // Reference has an organic curved wave beginning on left and flowing to right
  const waveStartY = format === 'post' ? H * 0.70 : H * 0.76;

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, waveStartY);
  ctx.bezierCurveTo(
    W * 0.32, waveStartY - H * 0.04,
    W * 0.68, waveStartY + H * 0.06,
    W, waveStartY + H * 0.02
  );
  ctx.lineTo(W, H);
  ctx.lineTo(0, H);
  ctx.closePath();

  // Linear gradient: vibrant magenta-pink on left to warm orange-coral on right
  const waveGrad = ctx.createLinearGradient(0, waveStartY, W, H);
  waveGrad.addColorStop(0, '#C9184A');   // deep magenta
  waveGrad.addColorStop(0.3, '#E02B5E'); // vibrant pink-red
  waveGrad.addColorStop(0.7, '#F0533B'); // coral red
  waveGrad.addColorStop(1, '#F3722C');   // warm orange
  ctx.fillStyle = waveGrad;
  ctx.fill();
  ctx.restore();

  // ─── ATTENDEE Pill Badge ───
  const pillY = waveStartY + (format === 'post' ? H * 0.038 : H * 0.032);
  const pillX = W * 0.06;
  const pillW = W * 0.17;
  const pillH = H * 0.032;

  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = Math.max(1, W * 0.0015);
  ctx.beginPath();
  ctx.roundRect(pillX, pillY, pillW, pillH, pillH / 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.round(W * 0.016)}px "IBM Plex Mono", monospace`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ATTENDEE', pillX + pillW / 2, pillY + pillH / 2);
  ctx.restore();

  // ─── Main Content Inside Wave ───
  const contentY = pillY + pillH + H * 0.024;

  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  // If user entered a name, display it prominently
  let currentY = contentY;
  if (name.trim()) {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(W * 0.046)}px "Inter", sans-serif`;
    ctx.fillText(name.trim().toUpperCase(), W * 0.06, currentY);
    currentY += Math.round(W * 0.056);
  }

  // "I'm Attending AWS Student Community Day Mysuru" heading
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${Math.round(W * 0.038)}px "Inter", sans-serif`;
  ctx.fillText("I'm Attending AWS", W * 0.06, currentY);
  ctx.fillText("Student Community Day Mysuru", W * 0.06, currentY + Math.round(W * 0.046));

  // Date and Venue at Bottom-Right of the card (matching reference)
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  const metaBottomY = H - H * 0.035;

  ctx.font = `500 ${Math.round(W * 0.018)}px "IBM Plex Mono", monospace`;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillText('📍 VVCE, MYSURU', W * 0.94, metaBottomY - Math.round(W * 0.026));
  ctx.fillText('📅 NOVEMBER 21, 2026', W * 0.94, metaBottomY);

  ctx.restore();
}
