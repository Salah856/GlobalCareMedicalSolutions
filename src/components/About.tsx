import { keyframes, css } from '@emotion/react';
import styled from '@emotion/styled'; 



const colors = {
  primary: '#039AFF',     // Blue color
  secondary: '#031CFF',   // Darker blue
  accent: '#6803FF',      // Purple accent
  accent2: '#EB2626',     // Red accent
};

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.02);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const gradientShift = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Styled components
const Section = styled.section`
  padding: 5rem 0;
  background: white;
`;

const Container = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }
`;

const AnimatedImageContainer = styled.div`
  animation: ${fadeIn} 0.8s ease-out;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(3, 154, 255, 0.1);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 25px 50px rgba(3, 154, 255, 0.2);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  background: linear-gradient(90deg, ${colors.primary}, ${colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeIn} 0.8s ease-out 0.1s both;
  
  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }
`;

const Card = styled.div<{ color: string; delay: number }>`
  padding: 1.5rem;
  border-radius: 1rem;
  background: ${({ color }) => color}08;
  border: 1px solid ${({ color }) => color}20;
  animation: ${fadeIn} 0.8s ease-out ${({ delay }) => delay}s both;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px ${({ color }) => color}15;
    border-color: ${({ color }) => color}40;
    background: ${({ color }) => color}10;
  }
`;

const CardTitle = styled.h3<{ color: string }>`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ color }) => color};
  margin-bottom: 0.75rem;
  animation: ${pulse} 2s infinite;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ListItem = styled.li<{ delay: number }>`
  color: inherit;
  animation: ${fadeIn} 0.8s ease-out ${({ delay }) => delay}s both;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeatureCard = styled.div<{ delay: number }>`
  padding: 1rem;
  border-radius: 0.75rem;
  background: #f9fafb;
  box-shadow: 0 4px 6px rgba(3, 154, 255, 0.08);
  animation: ${fadeIn} 0.8s ease-out ${({ delay }) => delay}s both;
  transition: all 0.3s ease;
  border-left: 4px solid ${colors.accent};
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(104, 3, 255, 0.15);
    border-left-color: ${colors.primary};
    background: white;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${colors.secondary};
  margin-bottom: 0.5rem;
`;

const Paragraph = styled.p<{ delay: number }>`
  color: #4b5563;
  animation: ${fadeIn} 0.8s ease-out ${({ delay }) => delay}s both;
  line-height: 1.6;
`;

const ValueProposition = styled.div`
  padding: 1.5rem;
  border-radius: 1rem;
  background: linear-gradient(135deg, ${colors.primary}10 0%, ${colors.accent}10 100%);
  background-size: 200% 200%;
  animation: ${gradientShift} 3s ease infinite, ${fadeIn} 0.8s ease-out 0.4s both;
  border: 1px solid ${colors.primary}30;
`;

export function About() {
  const features = [
    { title: "Expert Team", description: "Certified medical billing professionals" },
    { title: "Advanced Technology", description: "State-of-the-art billing software" },
    { title: "Compliance", description: "HIPAA compliant and secure processes" },
    { title: "24/7 Support", description: "Round-the-clock customer support" }
  ];
  
  const problems = [
    "Are you having troubles organizing your billing cycle?",
    "Do you face multiple delays in your revenue?",
    "You get a lot of patient complaints about their bills?"
  ];
  
  return (
    <Section>
      <Container>
        <Grid>
          <AnimatedImageContainer>
            <Image 
              src="https://thespark.pro/wp-content/uploads/2024/09/maim-light.jpg" 
              alt="Healthcare Professional"
            />
          </AnimatedImageContainer>
          
          <ContentContainer>
            <Title>Why Choose GCMS?</Title>
            
            <Card color={colors.primary} delay={0.2}>
              <CardTitle color={colors.primary}>
                About Global Care Medical Solutions
              </CardTitle>
              <Paragraph delay={0.3}>
                At Global Care Medical Solutions we are committed to provide accurate and effective medical billing services.
              </Paragraph>
              <List>
                <ListItem delay={0.4}>
                  Our highly trained staff is an extension to your office helping you focus on providing the quality care to your patients
                </ListItem>
                <ListItem delay={0.5}>
                  We dedicate our team to increasing your revenue and handling patients concerns with utmost efficiency
                </ListItem>
              </List>
            </Card>
            
            <Card color={colors.accent2} delay={0.3}>
              <CardTitle color={colors.accent2}>
                Common Challenges We Solve:
              </CardTitle>
              <List>
                {problems.map((problem, index) => (
                  <ListItem key={index} delay={0.4 + index * 0.1}>
                    {problem}
                  </ListItem>
                ))}
              </List>
            </Card>
            
            <ValueProposition>
              <Paragraph delay={0.4}>
                We are here to provide outstanding Revenue Cycle Management ensuring ever growing cashflow for your business.
              </Paragraph>
            </ValueProposition>
            
            <Paragraph delay={0.5}>
              We are trusted by top healthcare providers for our expertise, reliability, and commitment to excellence in medical billing services.
            </Paragraph>
            
            <FeaturesGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index} delay={0.6 + index * 0.1}>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <Paragraph delay={0}>{feature.description}</Paragraph>
                </FeatureCard>
              ))}
            </FeaturesGrid>
          </ContentContainer>
        </Grid>
      </Container>
    </Section>
  );
};




// export function About() {
//   const features = [
//     { title: "Expert Team", description: "Certified medical billing professionals" },
//     { title: "Advanced Technology", description: "State-of-the-art billing software" },
//     { title: "Compliance", description: "HIPAA compliant and secure processes" },
//     { title: "24/7 Support", description: "Round-the-clock customer support" }
//   ];
  
//   const problems = [
//     "Are you having troubles organizing your billing cycle?",
//     "Do you face multiple delays in your revenue?",
//     "You get a lot of patient complaints about their bills?"
//   ];
  
//   return (
//     <section className="py-20 bg-gray-50 dark:bg-slate-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Animated Image */}
//           <div className="animate-fade-in">
//             <img 
//               src="https://thespark.pro/wp-content/uploads/2024/09/maim-light.jpg" 
//               alt="Healthcare Professional" 
//               className="w-full h-auto rounded-lg shadow-lg transform hover:scale-105 transition-all duration-500"
//             />
//           </div>
          
//           {/* Animated Content */}
//           <div className="space-y-8">
//             <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white animate-fade-in delay-100">
//               Why Choose GCMS?
//             </h2>
            
//             {/* Company introduction */}
//             <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg animate-fade-in delay-200">
//               <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3 animate-pulse">
//                 About Global Care Medical Solutions
//               </h3>
//               <p className="text-green-700 dark:text-green-200 mb-4">
//                 At Global Care Medical Solutions we are committed to provide accurate and effective medical billing services.
//               </p>
//               <ul className="list-disc pl-5 space-y-2 text-green-700 dark:text-green-200">
//                 <li className="animate-fade-in delay-300">Our highly trained staff is an extension to your office helping you focus on providing the quality care to your patients</li>
//                 <li className="animate-fade-in delay-400">We dedicate our team to increasing your revenue and handling patients concerns with utmost efficiency</li>
//               </ul>
//             </div>
            
//             {/* Problem statements */}
//             <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg animate-fade-in delay-300">
//               <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3 animate-pulse">
//                 Common Challenges We Solve:
//               </h3>
//               <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-200">
//                 {problems.map((problem, index) => (
//                   <li key={index} className="animate-fade-in" style={{animationDelay: `${400 + index * 100}ms`}}>
//                     {problem}
//                   </li>
//                 ))}
//               </ul>
//             </div>
            
//             {/* Value proposition */}
//             <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg animate-fade-in delay-400">
//               <p className="text-lg font-medium text-blue-800 dark:text-blue-200 animate-pulse">
//                 We are here to provide outstanding Revenue Cycle Management ensuring ever growing cashflow for your business.
//               </p>
//             </div>
            
//             <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in delay-500">
//               We are trusted by top healthcare providers for our expertise, reliability, and commitment to excellence in medical billing services.
//             </p>
            
//             {/* Features grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               {features.map((feature, index) => (
//                 <div 
//                   key={index} 
//                   className="space-y-2 p-4 bg-white dark:bg-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
//                   style={{animationDelay: `${600 + index * 100}ms`}}
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 dark:text-gray-300">
//                     {feature.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// };

