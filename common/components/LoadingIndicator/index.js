import React from "react";

import Circle from "./Circle";
import Wrapper from "./Wrapper";

const LoadingIndicator = () => (
  <Wrapper>
    <Circle child={1} top={63} left={64} delay={-0.036} />
    <Circle child={2} top={68} left={56} delay={-0.072} />
    <Circle child={3} top={71} left={48} delay={-0.108} />
    <Circle child={4} top={72} left={40} delay={-0.144} />
    <Circle child={5} top={71} left={32} delay={-0.18} />
    <Circle child={6} top={68} left={24} delay={-0.216} />
    <Circle child={7} top={63} left={17} delay={-0.252} />
    <Circle child={8} top={56} left={12} delay={-0.288} />
  </Wrapper>
);

export default LoadingIndicator;
