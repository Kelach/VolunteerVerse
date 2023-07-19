import { Button, Text, Group, Title, Container, createStyles, Image, LoadingOverlay } from "@mantine/core";
import WhatWeDo from "./WhatWeDo"
import CallToAction from "./CallToAction";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png"

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    fontSize: 10,
    margin: 0,
    [theme.fn.smallerThan("lg")]: {
      height: "80%",
    },
    [theme.fn.smallerThan("sm")]: {
      height: "70%",
    }
  },
  content : {
    maxWidth: "60rem",
    display: "flex",
    flexDirection: "row",
    gap: theme.spacing.xl,
    alignItems: "start",
    // alignSelf: "start",
    margin: 0,
    [theme.fn.smallerThan("lg")]: {
      padding: 0,
    },
    [theme.fn.smallerThan("sm")]: {
      gap: 0,
      padding: 0,
    }
  },
  title: {
    fontSize: `calc(${theme.fontSizes.xl} * 5)`,
    color: theme.white,

    [theme.fn.smallerThan('md')] : {
      fontSize: `calc(${theme.fontSizes.xl} * 2.5)`
    },
    [theme.fn.smallerThan('sm')] : {
      fontSize: `calc(${theme.fontSizes.xl} * 2)`
    }
  },
  description: {
    color: theme.white,
    fontWeight: 500,
    paddingLeft: 16,
    fontSize: `calc(${theme.fontSizes.xl} * 1.9)`,
    textAlign: "start",
    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: `calc(${theme.fontSizes.xl} * 1)`,
      paddingLeft: 8,
    },
    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
      fontSize: `calc(${theme.fontSizes.sm} * 1.5)`,
      paddingLeft: 8,
    },
  },
  leftContent: {
    padding: 0
  },
  image : {
    position: "relative",
    minWidth: 420,
    height: "100%",
    width: "100%",
    [theme.fn.smallerThan('lg')]: {
      minWidth: 250,
    },
    [theme.fn.smallerThan('md')]: {
      minWidth: 350,
    },
    [theme.fn.smallerThan('sm')]: {
      minWidth: 30,
    }
  },
  button : {
    transition: "all 150ms ease-in-out",
    "&:hover":{
      backgroundColor: theme.white
    },
    borderWidth:  2,
    [theme.fn.smallerThan('sm')]: {
      // fontSize: `calc(${})`,
      paddingLeft: theme.spacing.md,
      paddingRight: theme.spacing.md,
      flex: 1
    },

  },
  highlight : {
    fontWeight: 700,
    position: 'relative',
    color: theme.fn.variant({ variant: 'dark', color: theme.primaryColor }).background,
    // backgroundColor: theme.fn.variant({ variant: 'light', color: theme.white }).background,
    borderRadius: theme.radius.sm,
    padding: `${4} ${12}`
  }
}))
export default function Landing() {
  /**
   * @todo maybe include a section showcasing features of the application
   */
  const { classes } = useStyles();
  return (
    <>
    <Container className={classes.container}>
      <Container className={classes.content}>
        <Container className={classes.leftContent}>
          <Title order={1}
            align="left" className={classes.title}>
            Volunteer<Text inherit component="span" sx={(theme) => ({color : theme.colors.violet[8]})}>Verse</Text>
          </Title>
          <Text mt="xl" className={classes.description}>
            Connecting students and non-profits with <span className={classes.highlight}>impactful opportunties.</span>
          </Text>
          <Group mt="xl" pt="xl" pl="md">
            <Button className={classes.button} size="xl" radius={"xl"} component={Link} to={"/signup"}>Sign Up</Button>
            <Button variant="outline" className={classes.button} size="xl" radius={"xl"} component={Link} to={"/login"}>Login</Button>
          </Group>
        </Container>
          <Image alt="VolunteerVerse Logo. A purple hand with a smiley face" className={classes.image} fit={"contain"}src={Logo} />
      </Container>
    </Container>
    <WhatWeDo />
    <CallToAction />
    </>
  )
}