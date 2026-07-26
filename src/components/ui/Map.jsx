"use client";
import { jsx, jsxs } from "react/jsx-runtime";
import * as MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
};
const blankMapStyle = {
  version: 8,
  sources: {},
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "rgba(0, 0, 0, 0)" }
    }
  ]
};
function useStableValue(value) {
  const key = useMemo(() => JSON.stringify(value) ?? "", [value]);
  return useMemo(() => value, [key]);
}
function mergeHoverPaint(paint, hoverPaint) {
  if (!hoverPaint) return paint;
  const merged = { ...paint };
  for (const [key, hoverValue] of Object.entries(hoverPaint)) {
    if (hoverValue === void 0) continue;
    const baseValue = merged[key];
    merged[key] = baseValue === void 0 ? hoverValue : [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      hoverValue,
      baseValue
    ];
  }
  return merged;
}
function getDocumentTheme() {
  if (typeof document === "undefined") return null;
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  const dataTheme = root.dataset.theme;
  if (dataTheme === "dark" || dataTheme === "light") return dataTheme;
  return null;
}
function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function useResolvedTheme(themeProp) {
  const [detectedTheme, setDetectedTheme] = useState(
    () => getDocumentTheme() ?? getSystemTheme()
  );
  useEffect(() => {
    if (themeProp) return;
    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      if (docTheme) {
        setDetectedTheme(docTheme);
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"]
    });
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (!getDocumentTheme()) {
        setDetectedTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [themeProp]);
  return themeProp ?? detectedTheme;
}
const MapContext = createContext(null);
function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}
function getViewport(map) {
  const center = map.getCenter();
  return {
    center: [center.lng, center.lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch()
  };
}
const Map = forwardRef(function Map2({
  children,
  className,
  theme: themeProp,
  styles,
  blank = false,
  projection,
  viewport,
  onViewportChange,
  loading = false,
  ...props
}, ref) {
  const containerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [pendingStyle, setPendingStyle] = useState(null);
  const currentStyleRef = useRef(null);
  const styleSwapInFlightRef = useRef(false);
  const internalUpdateRef = useRef(false);
  const resolvedTheme = useResolvedTheme(themeProp);
  const isControlled = viewport !== void 0 && onViewportChange !== void 0;
  const onViewportChangeRef = useRef(onViewportChange);
  onViewportChangeRef.current = onViewportChange;
  const stableStyles = useStableValue(styles);
  const mapStyles = useMemo(() => {
    if (stableStyles) {
      return {
        dark: stableStyles.dark ?? defaultStyles.dark,
        light: stableStyles.light ?? defaultStyles.light
      };
    }
    if (blank) {
      return { dark: blankMapStyle, light: blankMapStyle };
    }
    return defaultStyles;
  }, [stableStyles, blank]);
  useImperativeHandle(ref, () => mapInstance, [mapInstance]);
  useEffect(() => {
    if (!containerRef.current) return;
    const initialStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    currentStyleRef.current = initialStyle;
    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: initialStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true
      },
      ...props,
      ...viewport
    });
    const styleLoadHandler = () => {
      styleSwapInFlightRef.current = false;
      setIsStyleLoaded(true);
    };
    const loadHandler = () => setIsLoaded(true);
    const handleMove = () => {
      if (internalUpdateRef.current) return;
      onViewportChangeRef.current?.(getViewport(map));
    };
    map.on("load", loadHandler);
    map.on("style.load", styleLoadHandler);
    map.on("move", handleMove);
    setMapInstance(map);
    return () => {
      map.off("load", loadHandler);
      map.off("style.load", styleLoadHandler);
      map.off("move", handleMove);
      map.remove();
      setIsLoaded(false);
      setIsStyleLoaded(false);
      setMapInstance(null);
    };
  }, []);
  useEffect(() => {
    if (!mapInstance || !isControlled || !viewport) return;
    if (mapInstance.isMoving()) return;
    const current = getViewport(mapInstance);
    const next = {
      center: viewport.center ?? current.center,
      zoom: viewport.zoom ?? current.zoom,
      bearing: viewport.bearing ?? current.bearing,
      pitch: viewport.pitch ?? current.pitch
    };
    if (next.center[0] === current.center[0] && next.center[1] === current.center[1] && next.zoom === current.zoom && next.bearing === current.bearing && next.pitch === current.pitch) {
      return;
    }
    internalUpdateRef.current = true;
    mapInstance.jumpTo(next);
    internalUpdateRef.current = false;
  }, [mapInstance, isControlled, viewport]);
  useEffect(() => {
    if (!mapInstance || !resolvedTheme) return;
    const newStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    if (currentStyleRef.current === newStyle) return;
    currentStyleRef.current = newStyle;
    setIsStyleLoaded(false);
    setPendingStyle(newStyle);
  }, [mapInstance, resolvedTheme, mapStyles]);
  useEffect(() => {
    if (!mapInstance || !pendingStyle) return;
    setPendingStyle(null);
    styleSwapInFlightRef.current = true;
    mapInstance.setStyle(pendingStyle, { diff: false });
  }, [mapInstance, pendingStyle]);
  useEffect(() => {
    if (!mapInstance || !isStyleLoaded || !projection) return;
    if (styleSwapInFlightRef.current) return;
    mapInstance.setProjection(projection);
  }, [mapInstance, isStyleLoaded, projection]);
  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded: isLoaded && isStyleLoaded,
      resolvedTheme
    }),
    [mapInstance, isLoaded, isStyleLoaded, resolvedTheme]
  );
  return /* @__PURE__ */ jsx(MapContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref: containerRef,
      className: cn("relative h-full w-full", className),
      children: mapInstance && children
    }
  ) });
});
const MarkerContext = createContext(null);
function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}
function MapMarker({
  longitude,
  latitude,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onDragStart,
  onDrag,
  onDragEnd,
  draggable = false,
  ...markerOptions
}) {
  const { map } = useMap();
  const callbacksRef = useRef({
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDrag,
    onDragEnd
  });
  callbacksRef.current = {
    onClick,
    onMouseEnter,
    onMouseLeave,
    onDragStart,
    onDrag,
    onDragEnd
  };
  const marker = useMemo(() => {
    const markerInstance = new MapLibreGL.Marker({
      ...markerOptions,
      element: document.createElement("div"),
      draggable
    }).setLngLat([longitude, latitude]);
    const handleClick = (e) => callbacksRef.current.onClick?.(e);
    const handleMouseEnter = (e) => callbacksRef.current.onMouseEnter?.(e);
    const handleMouseLeave = (e) => callbacksRef.current.onMouseLeave?.(e);
    markerInstance.getElement()?.addEventListener("click", handleClick);
    markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);
    const handleDragStart = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDragStart?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDrag = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDrag?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    const handleDragEnd = () => {
      const lngLat = markerInstance.getLngLat();
      callbacksRef.current.onDragEnd?.({ lng: lngLat.lng, lat: lngLat.lat });
    };
    markerInstance.on("dragstart", handleDragStart);
    markerInstance.on("drag", handleDrag);
    markerInstance.on("dragend", handleDragEnd);
    return markerInstance;
  }, []);
  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map]);
  const { offset, rotation, rotationAlignment, pitchAlignment } = markerOptions;
  useEffect(() => {
    const current = marker.getLngLat();
    if (current.lng !== longitude || current.lat !== latitude) {
      marker.setLngLat([longitude, latitude]);
    }
    if (marker.isDraggable() !== draggable) {
      marker.setDraggable(draggable);
    }
    const currentOffset = marker.getOffset();
    const newOffset = offset ?? [0, 0];
    const [newOffsetX, newOffsetY] = Array.isArray(newOffset) ? newOffset : [newOffset.x, newOffset.y];
    if (currentOffset.x !== newOffsetX || currentOffset.y !== newOffsetY) {
      marker.setOffset(newOffset);
    }
    if (marker.getRotation() !== (rotation ?? 0)) {
      marker.setRotation(rotation ?? 0);
    }
    if (marker.getRotationAlignment() !== (rotationAlignment ?? "auto")) {
      marker.setRotationAlignment(rotationAlignment ?? "auto");
    }
    if (marker.getPitchAlignment() !== (pitchAlignment ?? "auto")) {
      marker.setPitchAlignment(pitchAlignment ?? "auto");
    }
  }, [
    marker,
    longitude,
    latitude,
    draggable,
    offset,
    rotation,
    rotationAlignment,
    pitchAlignment
  ]);
  return /* @__PURE__ */ jsx(MarkerContext.Provider, { value: { marker, map }, children });
}
function MarkerContent({ children, className }) {
  const { marker } = useMarkerContext();
  return createPortal(
    /* @__PURE__ */ jsx("div", { className: cn("relative cursor-pointer", className), children: children || /* @__PURE__ */ jsx(DefaultMarkerIcon, {}) }),
    marker.getElement()
  );
}
function DefaultMarkerIcon() {
  return /* @__PURE__ */ jsx("div", { className: "relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" });
}
function PopupCloseButton({ onClick }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      "aria-label": "Close popup",
      className: "focus-visible:ring-ring hover:bg-muted text-foreground absolute top-1 right-1 z-10 inline-flex size-5 cursor-pointer items-center justify-center rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset",
      children: /* @__PURE__ */ jsx(X, { className: "size-3.5" })
    }
  );
}
function MarkerPopup({
  children,
  className,
  closeButton = false,
  ...popupOptions
}) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const { offset, maxWidth } = popupOptions;
  const popup = useMemo(() => {
    const popupInstance = new MapLibreGL.Popup({
      offset: 16,
      ...popupOptions,
      closeButton: false
    }).setMaxWidth("none").setDOMContent(container);
    return popupInstance;
  }, []);
  useEffect(() => {
    if (!map) return;
    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => {
      marker.setPopup(null);
    };
  }, [map]);
  useEffect(() => {
    popup.setOffset(offset ?? 16);
    if (maxWidth) {
      popup.setMaxWidth(maxWidth);
    }
  }, [popup, offset, maxWidth]);
  const handleClose = () => popup.remove();
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-popover text-popover-foreground relative max-w-62 rounded-md border p-3 shadow-md",
          "animate-in fade-in-0 zoom-in-95 duration-200 ease-out",
          className
        ),
        children: [
          closeButton && /* @__PURE__ */ jsx(PopupCloseButton, { onClick: handleClose }),
          children
        ]
      }
    ),
    container
  );
}
function MarkerTooltip({
  children,
  className,
  ...popupOptions
}) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const { offset, maxWidth } = popupOptions;
  const tooltip = useMemo(() => {
    const tooltipInstance = new MapLibreGL.Popup({
      offset: 16,
      ...popupOptions,
      closeOnClick: true,
      closeButton: false
    }).setMaxWidth("none");
    return tooltipInstance;
  }, []);
  useEffect(() => {
    if (!map) return;
    tooltip.setDOMContent(container);
    const handleMouseEnter = () => {
      tooltip.setLngLat(marker.getLngLat()).addTo(map);
    };
    const handleMouseLeave = () => tooltip.remove();
    marker.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    marker.getElement()?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      marker.getElement()?.removeEventListener("mouseenter", handleMouseEnter);
      marker.getElement()?.removeEventListener("mouseleave", handleMouseLeave);
      tooltip.remove();
    };
  }, [map]);
  useEffect(() => {
    tooltip.setOffset(offset ?? 16);
    if (maxWidth) {
      tooltip.setMaxWidth(maxWidth);
    }
  }, [tooltip, offset, maxWidth]);
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "bg-foreground text-background pointer-events-none rounded-md px-2 py-1 text-xs text-balance shadow-md",
          "animate-in fade-in-0 zoom-in-95 duration-200 ease-out",
          className
        ),
        children
      }
    ),
    container
  );
}
function MarkerLabel({
  children,
  className,
  position = "top"
}) {
  const positionClasses2 = {
    top: "bottom-full mb-1",
    bottom: "top-full mt-1"
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "absolute left-1/2 -translate-x-1/2 whitespace-nowrap",
        "text-foreground text-[10px] font-medium",
        positionClasses2[position],
        className
      ),
      children
    }
  );
}
const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2"
};
function ControlGroup({ children }) {
  return /* @__PURE__ */ jsx("div", { className: "border-border bg-background [&>button:not(:last-child)]:border-border flex flex-col overflow-hidden rounded-md border shadow-sm [&>button:not(:last-child)]:border-b", children });
}
function ControlButton({
  onClick,
  label,
  children,
  disabled = false
}) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick,
      "aria-label": label,
      type: "button",
      className: cn(
        "flex size-8 items-center justify-center transition-colors",
        "first:rounded-t-md last:rounded-b-md",
        "hover:bg-accent dark:hover:bg-accent/40",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-inset",
        "disabled:pointer-events-none disabled:opacity-50"
      ),
      disabled,
      children
    }
  );
}
function MapControls({
  position = "bottom-right",
  showZoom = true,
  showCompass = false,
  showLocate = false,
  showFullscreen = false,
  className,
  onLocate
}) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const handleZoomIn = useCallback(() => {
    map?.zoomTo(map.getZoom() + 1, { duration: 300 });
  }, [map]);
  const handleZoomOut = useCallback(() => {
    map?.zoomTo(map.getZoom() - 1, { duration: 300 });
  }, [map]);
  const handleResetBearing = useCallback(() => {
    map?.resetNorthPitch({ duration: 300 });
  }, [map]);
  const handleLocate = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    setWaitingForLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          longitude: pos.coords.longitude,
          latitude: pos.coords.latitude
        };
        map?.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 14,
          duration: 1500
        });
        onLocate?.(coords);
        setWaitingForLocation(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setWaitingForLocation(false);
      },
      // Without a timeout the spec default is Infinity: a dismissed permission
      // prompt would leave the button disabled forever.
      { timeout: 1e4 }
    );
  }, [map, onLocate]);
  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, [map]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "absolute z-10 flex flex-col gap-1.5",
        positionClasses[position],
        className
      ),
      children: [
        showZoom && /* @__PURE__ */ jsxs(ControlGroup, { children: [
          /* @__PURE__ */ jsx(ControlButton, { onClick: handleZoomIn, label: "Zoom in", children: /* @__PURE__ */ jsx(Plus, { className: "size-4" }) }),
          /* @__PURE__ */ jsx(ControlButton, { onClick: handleZoomOut, label: "Zoom out", children: /* @__PURE__ */ jsx(Minus, { className: "size-4" }) })
        ] }),
        showCompass && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(CompassButton, { onClick: handleResetBearing }) }),
        showLocate && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(
          ControlButton,
          {
            onClick: handleLocate,
            label: "Find my location",
            disabled: waitingForLocation,
            children: waitingForLocation ? /* @__PURE__ */ jsx(Loader2, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsx(Locate, { className: "size-4" })
          }
        ) }),
        showFullscreen && /* @__PURE__ */ jsx(ControlGroup, { children: /* @__PURE__ */ jsx(ControlButton, { onClick: handleFullscreen, label: "Toggle fullscreen", children: /* @__PURE__ */ jsx(Maximize, { className: "size-4" }) }) })
      ]
    }
  );
}
function CompassButton({ onClick }) {
  const { map } = useMap();
  const compassRef = useRef(null);
  useEffect(() => {
    if (!map || !compassRef.current) return;
    const compass = compassRef.current;
    const updateRotation = () => {
      const bearing = map.getBearing();
      const pitch = map.getPitch();
      compass.style.transform = `rotateX(${pitch}deg) rotateZ(${-bearing}deg)`;
    };
    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();
    return () => {
      map.off("rotate", updateRotation);
      map.off("pitch", updateRotation);
    };
  }, [map]);
  return /* @__PURE__ */ jsx(ControlButton, { onClick, label: "Reset bearing to north", children: /* @__PURE__ */ jsxs(
    "svg",
    {
      ref: compassRef,
      viewBox: "0 0 24 24",
      className: "size-5",
      style: { transformStyle: "preserve-3d" },
      children: [
        /* @__PURE__ */ jsx("path", { d: "M12 2L16 12H12V2Z", className: "fill-red-500" }),
        /* @__PURE__ */ jsx("path", { d: "M12 2L8 12H12V2Z", className: "fill-red-300" }),
        /* @__PURE__ */ jsx("path", { d: "M12 22L16 12H12V22Z", className: "fill-muted-foreground/60" }),
        /* @__PURE__ */ jsx("path", { d: "M12 22L8 12H12V22Z", className: "fill-muted-foreground/30" })
      ]
    }
  ) });
}
function MapPopup({
  longitude,
  latitude,
  onClose,
  children,
  className,
  closeButton = false,
  ...popupOptions
}) {
  const { map } = useMap();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const container = useMemo(() => document.createElement("div"), []);
  const { offset, maxWidth } = popupOptions;
  const popup = useMemo(() => {
    const popupInstance = new MapLibreGL.Popup({
      offset: 16,
      ...popupOptions,
      closeButton: false
    }).setMaxWidth("none").setLngLat([longitude, latitude]);
    return popupInstance;
  }, []);
  useEffect(() => {
    if (!map) return;
    const onCloseProp = () => onCloseRef.current?.();
    popup.on("close", onCloseProp);
    popup.setDOMContent(container);
    popup.addTo(map);
    return () => {
      popup.off("close", onCloseProp);
      if (popup.isOpen()) {
        popup.remove();
      }
    };
  }, [map]);
  useEffect(() => {
    const current = popup.getLngLat();
    if (!current || current.lng !== longitude || current.lat !== latitude) {
      popup.setLngLat([longitude, latitude]);
    }
    popup.setOffset(offset ?? 16);
    if (maxWidth) {
      popup.setMaxWidth(maxWidth);
    }
  }, [popup, longitude, latitude, offset, maxWidth]);
  const handleClose = () => {
    popup.remove();
  };
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-popover text-popover-foreground relative max-w-62 rounded-md border p-3 shadow-md",
          "animate-in fade-in-0 zoom-in-95 duration-200 ease-out",
          className
        ),
        children: [
          closeButton && /* @__PURE__ */ jsx(PopupCloseButton, { onClick: handleClose }),
          children
        ]
      }
    ),
    container
  );
}
function MapRoute({
  id: propId,
  coordinates,
  color = "#4285F4",
  width = 3,
  opacity = 0.8,
  dashArray,
  onClick,
  onMouseEnter,
  onMouseLeave,
  interactive = true
}) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `route-source-${id}`;
  const layerId = `route-layer-${id}`;
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates: [] }
      }
    });
    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: { "line-join": "round", "line-cap": "round" },
      paint: {
        "line-color": color,
        "line-width": width,
        "line-opacity": opacity,
        ...dashArray && { "line-dasharray": dashArray }
      }
    });
    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
      }
    };
  }, [isLoaded, map]);
  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) return;
    const source = map.getSource(sourceId);
    if (source) {
      source.setData({
        type: "Feature",
        properties: {},
        geometry: { type: "LineString", coordinates }
      });
    }
  }, [isLoaded, map, coordinates, sourceId]);
  useEffect(() => {
    if (!isLoaded || !map || !map.getLayer(layerId)) return;
    map.setPaintProperty(layerId, "line-color", color);
    map.setPaintProperty(layerId, "line-width", width);
    map.setPaintProperty(layerId, "line-opacity", opacity);
    map.setPaintProperty(layerId, "line-dasharray", dashArray);
  }, [isLoaded, map, layerId, color, width, opacity, dashArray]);
  useEffect(() => {
    if (!isLoaded || !map || !interactive) return;
    const handleClick = () => {
      onClick?.();
    };
    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
      onMouseEnter?.();
    };
    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
      onMouseLeave?.();
    };
    map.on("click", layerId, handleClick);
    map.on("mouseenter", layerId, handleMouseEnter);
    map.on("mouseleave", layerId, handleMouseLeave);
    return () => {
      map.off("click", layerId, handleClick);
      map.off("mouseenter", layerId, handleMouseEnter);
      map.off("mouseleave", layerId, handleMouseLeave);
    };
  }, [
    isLoaded,
    map,
    layerId,
    onClick,
    onMouseEnter,
    onMouseLeave,
    interactive
  ]);
  return null;
}
const GEOJSON_DEFAULT_COLORS = {
  light: { fill: "#d4d4d4", line: "#ffffff" },
  dark: { fill: "#404040", line: "#171717" }
};
function MapGeoJSON({
  data,
  id: propId,
  promoteId,
  fillPaint,
  linePaint,
  fillHoverPaint,
  onClick,
  onHover,
  interactive = false,
  beforeId
}) {
  const { map, isLoaded, resolvedTheme } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `geojson-source-${id}`;
  const fillLayerId = `geojson-fill-${id}`;
  const lineLayerId = `geojson-line-${id}`;
  const defaults = GEOJSON_DEFAULT_COLORS[resolvedTheme];
  const showFill = fillPaint !== false;
  const showLine = linePaint !== false;
  const mergedFillPaint = useMemo(
    () => mergeHoverPaint(
      { "fill-color": defaults.fill, ...fillPaint || {} },
      fillHoverPaint
    ),
    [defaults.fill, fillPaint, fillHoverPaint]
  );
  const mergedLinePaint = useMemo(
    () => ({
      "line-color": defaults.line,
      "line-width": 0.5,
      ...linePaint || {}
    }),
    [defaults.line, linePaint]
  );
  const latestRef = useRef({ onClick, onHover });
  latestRef.current = { onClick, onHover };
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, {
      type: "geojson",
      data,
      ...promoteId ? { promoteId } : {}
    });
    return () => {
      try {
        if (map.getLayer(lineLayerId)) map.removeLayer(lineLayerId);
        if (map.getLayer(fillLayerId)) map.removeLayer(fillLayerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
      }
    };
  }, [isLoaded, map]);
  useEffect(() => {
    if (!isLoaded || !map) return;
    const source = map.getSource(sourceId);
    source?.setData(data);
  }, [isLoaded, map, data, sourceId]);
  useEffect(() => {
    if (!isLoaded || !map) return;
    const source = map.getSource(sourceId);
    if (!source) return;
    if (showFill && !map.getLayer(fillLayerId)) {
      map.addLayer(
        {
          id: fillLayerId,
          type: "fill",
          source: sourceId,
          paint: mergedFillPaint
        },
        beforeId
      );
    } else if (!showFill && map.getLayer(fillLayerId)) {
      map.removeLayer(fillLayerId);
    }
    if (showLine && !map.getLayer(lineLayerId)) {
      map.addLayer(
        {
          id: lineLayerId,
          type: "line",
          source: sourceId,
          paint: mergedLinePaint
        },
        beforeId
      );
    } else if (!showLine && map.getLayer(lineLayerId)) {
      map.removeLayer(lineLayerId);
    }
    if (showFill && map.getLayer(fillLayerId)) {
      for (const [key, value] of Object.entries(mergedFillPaint)) {
        map.setPaintProperty(
          fillLayerId,
          key,
          value
        );
      }
    }
    if (showLine && map.getLayer(lineLayerId)) {
      for (const [key, value] of Object.entries(mergedLinePaint)) {
        map.setPaintProperty(
          lineLayerId,
          key,
          value
        );
      }
    }
  }, [
    isLoaded,
    map,
    sourceId,
    fillLayerId,
    lineLayerId,
    showFill,
    showLine,
    mergedFillPaint,
    mergedLinePaint,
    beforeId
  ]);
  useEffect(() => {
    if (!isLoaded || !map || !interactive || !showFill) return;
    let hoveredId = null;
    const setHover = (next) => {
      if (next === hoveredId) return;
      const sourceExists = !!map.getSource(sourceId);
      if (hoveredId != null && sourceExists) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false }
        );
      }
      hoveredId = next;
      if (next != null && sourceExists) {
        map.setFeatureState({ source: sourceId, id: next }, { hover: true });
      }
    };
    const handleMouseMove = (e) => {
      const feature = e.features?.[0];
      if (!feature) return;
      map.getCanvas().style.cursor = "pointer";
      const featureId = feature.id;
      if (featureId === hoveredId) return;
      setHover(featureId ?? null);
      latestRef.current.onHover?.({
        feature,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        originalEvent: e
      });
    };
    const handleMouseLeave = () => {
      setHover(null);
      map.getCanvas().style.cursor = "";
      latestRef.current.onHover?.(null);
    };
    const handleClick = (e) => {
      const feature = e.features?.[0];
      if (!feature) return;
      latestRef.current.onClick?.({
        feature,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        originalEvent: e
      });
    };
    map.on("mousemove", fillLayerId, handleMouseMove);
    map.on("mouseleave", fillLayerId, handleMouseLeave);
    map.on("click", fillLayerId, handleClick);
    return () => {
      map.off("mousemove", fillLayerId, handleMouseMove);
      map.off("mouseleave", fillLayerId, handleMouseLeave);
      map.off("click", fillLayerId, handleClick);
      setHover(null);
      map.getCanvas().style.cursor = "";
    };
  }, [isLoaded, map, fillLayerId, sourceId, interactive, showFill]);
  return null;
}
const DEFAULT_ARC_CURVATURE = 0.2;
const DEFAULT_ARC_SAMPLES = 64;
const ARC_HIT_MIN_WIDTH = 12;
const ARC_HIT_PADDING = 6;
const DEFAULT_ARC_PAINT = {
  "line-color": "#4285F4",
  "line-width": 2,
  "line-opacity": 0.85
};
const DEFAULT_ARC_LAYOUT = {
  "line-join": "round",
  "line-cap": "round"
};
function buildArcCoordinates(from, to, curvature, samples) {
  const [x0, y0] = from;
  const [xTo, y2] = to;
  const rawDx = xTo - x0;
  const x2 = rawDx > 180 ? xTo - 360 : rawDx < -180 ? xTo + 360 : xTo;
  const dx = x2 - x0;
  const dy = y2 - y0;
  const distance = Math.hypot(dx, dy);
  if (distance === 0 || curvature === 0) return [from, [x2, y2]];
  const mx = (x0 + x2) / 2;
  const my = (y0 + y2) / 2;
  const nx = -dy / distance;
  const ny = dx / distance;
  const offset = distance * curvature;
  const cx = mx + nx * offset;
  const cy = my + ny * offset;
  const points = [];
  const segments = Math.max(2, Math.floor(samples));
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const inv = 1 - t;
    const x = inv * inv * x0 + 2 * inv * t * cx + t * t * x2;
    const y = inv * inv * y0 + 2 * inv * t * cy + t * t * y2;
    points.push([x, y]);
  }
  return points;
}
function MapArc({
  data,
  id: propId,
  curvature = DEFAULT_ARC_CURVATURE,
  samples = DEFAULT_ARC_SAMPLES,
  paint,
  layout,
  hoverPaint,
  onClick,
  onHover,
  interactive = true,
  beforeId
}) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `arc-source-${id}`;
  const layerId = `arc-layer-${id}`;
  const hitLayerId = `arc-hit-layer-${id}`;
  const mergedPaint = useMemo(
    () => mergeHoverPaint({ ...DEFAULT_ARC_PAINT, ...paint }, hoverPaint),
    [paint, hoverPaint]
  );
  const mergedLayout = useMemo(
    () => ({ ...DEFAULT_ARC_LAYOUT, ...layout }),
    [layout]
  );
  const hitWidth = useMemo(() => {
    const w = paint?.["line-width"] ?? DEFAULT_ARC_PAINT["line-width"];
    const base = typeof w === "number" ? w : ARC_HIT_MIN_WIDTH;
    return Math.max(base + ARC_HIT_PADDING, ARC_HIT_MIN_WIDTH);
  }, [paint]);
  const geoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: data.map((arc) => {
        const { from, to, ...properties } = arc;
        return {
          type: "Feature",
          properties,
          geometry: {
            type: "LineString",
            coordinates: buildArcCoordinates(from, to, curvature, samples)
          }
        };
      })
    }),
    [data, curvature, samples]
  );
  const latestRef = useRef({ data, onClick, onHover });
  latestRef.current = { data, onClick, onHover };
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, {
      type: "geojson",
      data: geoJSON,
      promoteId: "id"
    });
    map.addLayer(
      {
        id: hitLayerId,
        type: "line",
        source: sourceId,
        layout: DEFAULT_ARC_LAYOUT,
        paint: {
          "line-color": "rgba(0, 0, 0, 0)",
          "line-width": hitWidth,
          "line-opacity": 1
        }
      },
      beforeId
    );
    map.addLayer(
      {
        id: layerId,
        type: "line",
        source: sourceId,
        layout: mergedLayout,
        paint: mergedPaint
      },
      beforeId
    );
    return () => {
      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getLayer(hitLayerId)) map.removeLayer(hitLayerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
      }
    };
  }, [isLoaded, map]);
  useEffect(() => {
    if (!isLoaded || !map) return;
    const source = map.getSource(sourceId);
    source?.setData(geoJSON);
  }, [isLoaded, map, geoJSON, sourceId]);
  useEffect(() => {
    if (!isLoaded || !map || !map.getLayer(layerId)) return;
    for (const [key, value] of Object.entries(mergedPaint)) {
      map.setPaintProperty(
        layerId,
        key,
        value
      );
    }
    for (const [key, value] of Object.entries(mergedLayout)) {
      map.setLayoutProperty(
        layerId,
        key,
        value
      );
    }
    if (map.getLayer(hitLayerId)) {
      map.setPaintProperty(hitLayerId, "line-width", hitWidth);
    }
  }, [isLoaded, map, layerId, hitLayerId, mergedPaint, mergedLayout, hitWidth]);
  useEffect(() => {
    if (!isLoaded || !map || !interactive) return;
    let hoveredId = null;
    const setHover = (next) => {
      if (next === hoveredId) return;
      const sourceExists = !!map.getSource(sourceId);
      if (hoveredId != null && sourceExists) {
        map.setFeatureState(
          { source: sourceId, id: hoveredId },
          { hover: false }
        );
      }
      hoveredId = next;
      if (next != null && sourceExists) {
        map.setFeatureState({ source: sourceId, id: next }, { hover: true });
      }
    };
    const findArc = (featureId) => featureId == null ? void 0 : latestRef.current.data.find(
      (arc) => String(arc.id) === String(featureId)
    );
    const handleMouseMove = (e) => {
      const featureId = e.features?.[0]?.id;
      if (featureId == null || featureId === hoveredId) return;
      setHover(featureId);
      map.getCanvas().style.cursor = "pointer";
      const arc = findArc(featureId);
      if (arc) {
        latestRef.current.onHover?.({
          arc,
          longitude: e.lngLat.lng,
          latitude: e.lngLat.lat,
          originalEvent: e
        });
      }
    };
    const handleMouseLeave = () => {
      setHover(null);
      map.getCanvas().style.cursor = "";
      latestRef.current.onHover?.(null);
    };
    const handleClick = (e) => {
      const arc = findArc(e.features?.[0]?.id);
      if (!arc) return;
      latestRef.current.onClick?.({
        arc,
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        originalEvent: e
      });
    };
    map.on("mousemove", hitLayerId, handleMouseMove);
    map.on("mouseleave", hitLayerId, handleMouseLeave);
    map.on("click", hitLayerId, handleClick);
    return () => {
      map.off("mousemove", hitLayerId, handleMouseMove);
      map.off("mouseleave", hitLayerId, handleMouseLeave);
      map.off("click", hitLayerId, handleClick);
      setHover(null);
      map.getCanvas().style.cursor = "";
    };
  }, [isLoaded, map, hitLayerId, sourceId, interactive]);
  return null;
}
const DEFAULT_CLUSTER_COLORS = [
  "#3b82f6",
  "#1d4ed8",
  "#1e3a8a"
];
const DEFAULT_CLUSTER_THRESHOLDS = [100, 750];
function MapClusterLayer({
  data,
  clusterMaxZoom = 14,
  clusterRadius = 50,
  clusterColors = DEFAULT_CLUSTER_COLORS,
  clusterThresholds = DEFAULT_CLUSTER_THRESHOLDS,
  pointColor = "#3b82f6",
  onPointClick,
  onClusterClick
}) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `cluster-source-${id}`;
  const clusterLayerId = `clusters-${id}`;
  const clusterCountLayerId = `cluster-count-${id}`;
  const unclusteredLayerId = `unclustered-point-${id}`;
  const stylePropsRef = useRef({
    clusterColors,
    clusterThresholds,
    pointColor
  });
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, {
      type: "geojson",
      data,
      cluster: true,
      clusterMaxZoom,
      clusterRadius
    });
    map.addLayer({
      id: clusterLayerId,
      type: "circle",
      source: sourceId,
      filter: ["has", "point_count"],
      paint: {
        "circle-color": [
          "step",
          ["get", "point_count"],
          clusterColors[0],
          clusterThresholds[0],
          clusterColors[1],
          clusterThresholds[1],
          clusterColors[2]
        ],
        "circle-radius": [
          "step",
          ["get", "point_count"],
          20,
          clusterThresholds[0],
          30,
          clusterThresholds[1],
          40
        ],
        "circle-stroke-width": 0.75,
        "circle-stroke-color": "#fff",
        "circle-opacity": 0.85
      }
    });
    map.addLayer({
      id: clusterCountLayerId,
      type: "symbol",
      source: sourceId,
      filter: ["has", "point_count"],
      layout: {
        "text-field": "{point_count_abbreviated}",
        "text-font": ["Open Sans Semibold"],
        "text-size": 12
      },
      paint: {
        "text-color": "#fff"
      }
    });
    map.addLayer({
      id: unclusteredLayerId,
      type: "circle",
      source: sourceId,
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": pointColor,
        "circle-radius": 5,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff"
      }
    });
    return () => {
      try {
        if (map.getLayer(clusterCountLayerId))
          map.removeLayer(clusterCountLayerId);
        if (map.getLayer(unclusteredLayerId))
          map.removeLayer(unclusteredLayerId);
        if (map.getLayer(clusterLayerId)) map.removeLayer(clusterLayerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
      }
    };
  }, [isLoaded, map, sourceId]);
  useEffect(() => {
    if (!isLoaded || !map || typeof data === "string") return;
    const source = map.getSource(sourceId);
    if (source) {
      source.setData(data);
    }
  }, [isLoaded, map, data, sourceId]);
  useEffect(() => {
    if (!isLoaded || !map) return;
    const prev = stylePropsRef.current;
    const colorsChanged = prev.clusterColors !== clusterColors || prev.clusterThresholds !== clusterThresholds;
    if (map.getLayer(clusterLayerId) && colorsChanged) {
      map.setPaintProperty(clusterLayerId, "circle-color", [
        "step",
        ["get", "point_count"],
        clusterColors[0],
        clusterThresholds[0],
        clusterColors[1],
        clusterThresholds[1],
        clusterColors[2]
      ]);
      map.setPaintProperty(clusterLayerId, "circle-radius", [
        "step",
        ["get", "point_count"],
        20,
        clusterThresholds[0],
        30,
        clusterThresholds[1],
        40
      ]);
    }
    if (map.getLayer(unclusteredLayerId) && prev.pointColor !== pointColor) {
      map.setPaintProperty(unclusteredLayerId, "circle-color", pointColor);
    }
    stylePropsRef.current = { clusterColors, clusterThresholds, pointColor };
  }, [
    isLoaded,
    map,
    clusterLayerId,
    unclusteredLayerId,
    clusterColors,
    clusterThresholds,
    pointColor
  ]);
  useEffect(() => {
    if (!isLoaded || !map) return;
    const handleClusterClick = async (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [clusterLayerId]
      });
      if (!features.length) return;
      const feature = features[0];
      const clusterId = feature.properties?.cluster_id;
      const pointCount = feature.properties?.point_count;
      const coordinates = feature.geometry.coordinates;
      if (onClusterClick) {
        onClusterClick(clusterId, coordinates, pointCount);
      } else {
        const source = map.getSource(sourceId);
        const zoom = await source.getClusterExpansionZoom(clusterId);
        map.easeTo({
          center: coordinates,
          zoom
        });
      }
    };
    const handlePointClick = (e) => {
      if (!onPointClick || !e.features?.length) return;
      const feature = e.features[0];
      const coordinates = feature.geometry.coordinates.slice();
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      onPointClick(
        feature,
        coordinates
      );
    };
    const handleMouseEnterCluster = () => {
      map.getCanvas().style.cursor = "pointer";
    };
    const handleMouseLeaveCluster = () => {
      map.getCanvas().style.cursor = "";
    };
    const handleMouseEnterPoint = () => {
      if (onPointClick) {
        map.getCanvas().style.cursor = "pointer";
      }
    };
    const handleMouseLeavePoint = () => {
      map.getCanvas().style.cursor = "";
    };
    map.on("click", clusterLayerId, handleClusterClick);
    map.on("click", unclusteredLayerId, handlePointClick);
    map.on("mouseenter", clusterLayerId, handleMouseEnterCluster);
    map.on("mouseleave", clusterLayerId, handleMouseLeaveCluster);
    map.on("mouseenter", unclusteredLayerId, handleMouseEnterPoint);
    map.on("mouseleave", unclusteredLayerId, handleMouseLeavePoint);
    return () => {
      map.off("click", clusterLayerId, handleClusterClick);
      map.off("click", unclusteredLayerId, handlePointClick);
      map.off("mouseenter", clusterLayerId, handleMouseEnterCluster);
      map.off("mouseleave", clusterLayerId, handleMouseLeaveCluster);
      map.off("mouseenter", unclusteredLayerId, handleMouseEnterPoint);
      map.off("mouseleave", unclusteredLayerId, handleMouseLeavePoint);
    };
  }, [
    isLoaded,
    map,
    clusterLayerId,
    unclusteredLayerId,
    sourceId,
    onClusterClick,
    onPointClick
  ]);
  return null;
}
export {
  Map,
  MapArc,
  MapClusterLayer,
  MapControls,
  MapGeoJSON,
  MapMarker,
  MapPopup,
  MapRoute,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
  MarkerTooltip,
  useMap
};
