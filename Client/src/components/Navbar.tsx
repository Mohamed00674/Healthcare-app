import { Flex, Text , Image } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex bg="#F3F3FD" >
      <Image src="/logo.svg" width="40px" height="40px" ml="40px" mt="10px" />
      <Text
        fontFamily="Satoshi"
        color="#6F3AFA "
        fontSize="20px"
        ml="10px"
        fontStyle="normal"
        fontWeight="980"
        width="224px"
        height="58px"
      >
        HealthyMe
      </Text>
      <Image src="./logo2.svg" width="30px"  height="30px"  ml="0px" />
    </Flex>
  );
}

export default Navbar;
