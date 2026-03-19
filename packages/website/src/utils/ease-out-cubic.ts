const easeOutCubic = (progress: number): number => 1 - (1 - progress) ** 3;

export default easeOutCubic;
