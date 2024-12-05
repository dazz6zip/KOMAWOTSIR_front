import { ComponentType, useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

interface PrivateRouterProps extends RouteProps {
  component: ComponentType<any>;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({
  component: Component,
  ...rest
}) => {
  const userId = parseInt(sessionStorage.getItem("userId") || "0");
  const [validate, setValidate] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    const validateToken = async () => {
      try {
        const res = await axios.get(`/api/users/token/validate/${userId}`);
        if (isMounted) {
          setValidate(res.data as boolean);
          if (!res.data) {
            toast.error("인증 만료. 다시 로그인해 주세요.");
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setValidate(false);
          toast.error("인증 실패. 다시 시도해 주세요.");
        }
      }
    };

    if (userId) {
      validateToken();
    } else {
      setValidate(false);
      toast.error("로그인 후 이용해 주세요!");
    }

    return () => {
      isMounted = false;
    };
  }, [userId]);

  if (validate === null) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        validate ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRouter;
