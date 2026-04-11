import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  fullname: string;
  email: string;
  how_did_you_hear: string;
  message: string;
}

export default function ContactEmail({
  fullname,
  email,
  how_did_you_hear,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>New message from {fullname}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>New contact form submission</Heading>
          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{fullname}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>

            {how_did_you_hear && (
              <>
                <Text style={styles.label}>How did they hear about you</Text>
                <Text style={styles.value}>{how_did_you_hear}</Text>
              </>
            )}

            <Text style={styles.label}>Message</Text>
            <Text style={styles.message}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: '#f4f4f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  container: {
    margin: '40px auto',
    padding: '32px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    maxWidth: '560px',
  },
  heading: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#0f172a',
    margin: '0 0 16px',
  },
  hr: {
    borderColor: '#e2e8f0',
    margin: '0 0 24px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
    margin: '0 0 4px',
  },
  value: {
    fontSize: '15px',
    color: '#1e293b',
    margin: '0 0 20px',
  },
  message: {
    fontSize: '15px',
    color: '#1e293b',
    margin: '0',
    whiteSpace: 'pre-wrap',
  },
};
