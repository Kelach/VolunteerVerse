import { Carousel } from "@mantine/carousel";
import {
  useMantineTheme,
  Title, Button
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { createStyles } from "@mantine/styles";
import { projectCardData } from "./data";
import { useAuthenticationUserProp } from "../../../services/hooks/useAuthentication";
import ProjectCard, { ProjectCardProps } from "./ProjectCard";
import { QueryBar, QueryProps } from "../../../components/QueryBar";
import { useForm } from "@mantine/form";
import { useContext, useEffect, useState } from "react";
import NotAuthorized from "../../NotAuthorized";
import { AuthenticationContext } from "../../../context/AuthenicationContext";
import { ApiResponseProp, apiClient } from "../../../services/ApiClient";
import NoneFound from "../../../components/NoneFound";


function VolunteerHome() {
  /**
   * @todo: implement loader when fecthing user projects
   */
  const { user, isValidVolunteer } = useContext(AuthenticationContext);
  const [volunteerProjects, setVolunteerProjects] = useState<ProjectCardProps[] | undefined>(undefined);

  const fetchProjects = async () => {
    // fetches project using the query form 
    apiClient.fetchProjects("volunteer", queryForm.values).then(({ data, success, statusCode, error }: ApiResponseProp) => {
      if (success) {
        console.log("fetched recommended projects for volunteer successfully: ", data)
        // setVolunteerProjects(data);
        setVolunteerProjects(projectCardData)
      } else {
        setVolunteerProjects([]);
        // display error notification? (stretch)
        console.log("Unable to fetch volunteer data", `error: ${error} code: ${statusCode}`);
      }
    }).catch((error) => {
      console.log("a very unexpeced error has occured: ", error)
    });
    console.log("fetchingProjects");
  }
  useEffect(() => { fetchProjects() }, []) // fetch projects
  const queryForm = useForm<QueryProps>({
    initialValues: {
      search: "",
      tags: [],
      timeRange: "Year"
    }
  });

  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const projectCardSlides = volunteerProjects?.map((item) => (
    <Carousel.Slide key={item.title}>
      <ProjectCard {...item} />
    </Carousel.Slide>
  ));

  return isValidVolunteer ? (
    <>
      <Title>{`Welcome Back ${user?.email}`}</Title>
      <QueryBar {...queryForm} />
      <Button size="lg" radius={"md"} compact onClick={fetchProjects}>Search Projects</Button>
      {
        volunteerProjects && volunteerProjects?.length > 0 ? <Carousel
          controlSize={isMobile ? 40 : 70}
          withIndicators
          slideSize="80%"
          breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
          slideGap="xl"
          align={"center"}
          slidesToScroll={1}
          styles={
            {
              root: { maxWidth: 1500, marginLeft: "auto", marginRight: "auto" },
              control: {
                backgroundColor: theme.colors.violet[1],
                transform: "scale(0.99)",
                transition: "all 200ms ease-in-out",
                "&:hover": { transform: "scale(1)", shadow: theme.shadows.md }
              }
            }
          }>

          {projectCardSlides}
        </Carousel> :
          <NoneFound title="No projects found" />
      }
    </>
  ) : <NotAuthorized />
}

export default VolunteerHome